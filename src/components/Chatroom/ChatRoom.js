import React, { Component, Fragment } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllUsers } from "../../store/actions";
import "./chatroom.css";

import ChatList from "../Chatlist/ChatList";
import Form from "../Form/Form";
import { socket } from "../../utils/socketConn";
import { DataHandle } from "../../utils/dataHandler";
import { API_CONSTANTS } from "../../constants/api";
import {
  fetchPrivateChats,
  getPrivateMessages
} from "../../store/actions/index";

class ChatRoom extends Component {
  state = {
    message: "",
    groupId: "",
    currentGroup: {},
    messageList: []
  };

  handleChange = ({ target }) => {
    this.setState({ message: target.value });
  };

  sendGroupMessage = () => {
    socket.emit(
      "groupMessage",
      this.state.currentGroup,
      this.state.message,
      this.props.user
    );
  };

  handleCurrentGroupState = data => {
    this.setState({ currentGroup: data });
    DataHandle.getGroupMessages(
      API_CONSTANTS.GET_GROUP_MESSAGES,
      this.props.user.name,
      data.groupId,
      this.handleGroupMessageState
    );
  };

  handleGroupMessageState = response => {
    this.setState({ messageList: response });
  };

  componentDidMount = () => {
    let groupId = this.props.history.location.pathname.split("/");
    this.setState({ groupId: groupId[3] });
    DataHandle.getCurrentGroup(
      API_CONSTANTS.GET_CURRENT_GROUP,
      groupId[3],
      this.handleCurrentGroupState
    );
  };

  componentDidUpdate = prevProps => {
    let groupId = prevProps.history.location.pathname.split("/");
    if (this.state.groupId !== groupId[3]) {
      this.setState({ groupId: groupId[3] });
      DataHandle.getCurrentGroup(
        API_CONSTANTS.GET_CURRENT_GROUP,
        groupId[3],
        this.handleCurrentGroupState
      );
    }
  };

  componentWillReceiveProps = nextProps => {
    let stateGroupMsg = [...this.state.messageList],
      groupTexts = [];
    if (nextProps.grpMsg) {
      groupTexts = nextProps.grpMsg.filter(
        elem => elem.recieverId === this.state.groupId
      );
    }
    groupTexts.forEach(msg => {
      let msgIndex = stateGroupMsg.findIndex(
        eachMsg =>
          eachMsg.sender === msg.sender && eachMsg.message === msg.message
      );
      if (msgIndex === -1) {
        stateGroupMsg.push(msg);
        return;
      }
    });
    this.setState({ messageList: stateGroupMsg });
  };

  render() {
    return (
      <div className="message-window">
        <h2 className="group-name">
          {this.state.currentGroup && this.state.currentGroup.groupname}
        </h2>
        <ChatList
          listText={this.state.messageList}
          currentUser={this.props.user}
        />
        <Form
          handleChange={this.handleChange}
          value={this.state.message}
          sendMessage={this.sendGroupMessage}
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
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    getPrivateMessages: (url, senderId, recieverId) =>
      dispatch(getPrivateMessages(url, senderId, recieverId))
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChatRoom)
);
