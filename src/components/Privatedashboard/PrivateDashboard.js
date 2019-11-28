import React, { Component, Fragment } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllUsers } from "../../store/actions";
import "./privatedashboard.css";

import ChatList from "../Chatlist/ChatList";
import Form from "../Form/Form";
import { socket } from "../../utils/socketConn";
import { DataHandle } from "../../utils/dataHandler";
import { API_CONSTANTS } from "../../constants/api";
import { fetchPrivateChats } from "../../store/actions/index";

class PrivateDashboard extends Component {
  state = {
    sender: {},
    recieverId: "",
    reciever: {},
    message: "",
    privateChat: [],
    messageList: [],
    pvtMsg: []
  };

  handleChatState = data => {
    this.props.fetchPrivateChats(data);
    console.log(data);
    this.setState({ messageList: data });
  };

  handleChange = ({ target }) => {
    this.setState({ message: target.value });
  };

  sendIndividualMessage = () => {
    socket.emit(
      "private",
      this.state.message,
      this.state.sender,
      this.state.reciever
    );
  };

  componentDidMount = () => {
    let recieverId = this.props.history.location.pathname.split("/");
    this.setState({ sender: this.props.user });
    DataHandle.getPrivateMessages(
      API_CONSTANTS.GET_PRIVATE_CHATS,
      this.props.user._id,
      recieverId[2],
      this.handleChatState
    );
  };

  componentDidUpdate = prevProps => {
    let recieverId = prevProps.history.location.pathname.split("/");
    if (this.state.recieverId !== recieverId[2]) {
      this.setState({ recieverId: recieverId[2] });
      let recieverObj = this.props.users.filter(
        user => user._id === recieverId[2]
      );
      this.setState({ reciever: recieverObj[0] });
      DataHandle.getPrivateMessages(
        API_CONSTANTS.GET_PRIVATE_CHATS,
        this.props.user._id,
        recieverId[2],
        this.handleChatState
      );
    }
  };

  componentWillReceiveProps = nextProps => {
    console.log(nextProps);
    let messageHistory = [...this.state.messageList];
    let recieverId = nextProps.history.location.pathname.split("/"),
      recieverObj = nextProps.users.filter(user => user._id === recieverId[2]),
      privateConversation = nextProps.privateMsg;
    privateConversation.forEach(elem => {
      let msgIndex = messageHistory.findIndex(
        eachMsg =>
          eachMsg.senderId === elem.senderId && eachMsg.message === elem.message
      );
      if (msgIndex === -1) {
        messageHistory.push(elem);
        return;
      }
    });
    console.log(messageHistory);
    let conversationData = messageHistory.filter(
      elem =>
        (elem.senderId === nextProps.user._id &&
          elem.recieverId === recieverId[2]) ||
        (elem.senderId === recieverId[2] &&
          elem.recieverId === nextProps.user._id)
    );
    console.log(conversationData);
    this.setState({ reciever: recieverObj[0], privateChat: conversationData });
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(prevState);
  //   let messageHistory = prevState.messageList;
  //   console.log(messageHistory);
  //   let recieverId = nextProps.history.location.pathname.split("/"),
  //     recieverObj = nextProps.users.filter(user => user._id === recieverId[2]),
  //     privateConversation = nextProps.privateMsg;
  //   privateConversation.forEach(elem => {
  //     let msgIndex = messageHistory.findIndex(
  //       eachMsg =>
  //         eachMsg.senderId === elem.senderId && eachMsg.message === elem.message
  //     );
  //     if (msgIndex === -1) {
  //       messageHistory.push(elem);
  //       return;
  //     }
  //   });
  //   console.log(messageHistory);
  //   let conversationData = messageHistory.filter(
  //     elem =>
  //       (elem.senderId === nextProps.user._id &&
  //         elem.recieverId === recieverId[2]) ||
  //       (elem.senderId === recieverId[2] &&
  //         elem.recieverId === nextProps.user._id)
  //   );
  //   console.log(conversationData);
  //   return {
  //     reciever: recieverObj[0],
  //     privateChat: conversationData,
  //     pvtMsg: conversationData
  //   };
  // }

  render() {
    return (
      <div className="message-window">
        <h2 className="reciever-name">
          {this.state.reciever && this.state.reciever.name}
        </h2>
        {this.state.privateChat.length > 0 ? (
          <ChatList
            listText={this.state.privateChat}
            currentUser={this.props.user}
          />
        ) : (
          <ChatList
            listText={this.state.messageList}
            currentUser={this.props.user}
          />
        )}
        {/* <ChatList
          listText={this.state.messageList}
          currentUser={this.props.user}
        /> */}
        <Form
          handleChange={this.handleChange}
          value={this.state.message}
          sendMessage={this.sendIndividualMessage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    user: state.auth.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers())
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PrivateDashboard)
);
