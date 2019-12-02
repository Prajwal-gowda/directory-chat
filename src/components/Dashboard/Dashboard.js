import React, { Component } from "react";
import Header from "../Header/Header";
import { withRouter, Switch, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import { socket } from "../../utils/socketConn";
import "./dashboard.css";
import { connect } from "react-redux";
import Form from "../Form/Form";
import SideBar from "../Sidebar/SideBar";
import ChatList from "../Chatlist/ChatList";
import PrivateDashboard from "../Privatedashboard/PrivateDashboard";
import ChatRoom from "../Chatroom/ChatRoom";
import { DataHandle } from "../../utils/dataHandler";
import { API_CONSTANTS } from "../../constants/api";
import PopUpForm from "../Popupform/PopUpForm";
import { ROUTE_CONSTANTS } from "../../constants/routepath";

class Dashboard extends Component {
  state = {
    messageList: [],
    message: "",
    userName: "",
    userList: [],
    userInformation: [],
    privateMsgs: [],
    conversations: [],
    roomData: {},
    groupMsg: []
  };

  handleChatState = data => {
    this.setState({ messageList: data });
  };

  handleChange = ({ target }) => {
    this.setState({ message: target.value });
  };

  sendMessage = () => {
    socket.emit(
      "chat message",
      this.state.message,
      this.props.user.name,
      this.props.user._id
    );
  };

  componentDidMount = () => {
    console.log(this.props.user);
    this.setState({ username: this.props.user.name }, () => {
      socket.emit("addUser", this.state.username, this.props.user);
    });

    socket.on("addUser", (userData, userInfo) => {
      let userInformation = Object.values(userInfo);
      this.setState({ userInformation });
      let listOfUsers = Object.keys(userData);
      this.setState({ userList: listOfUsers });
    });

    DataHandle.getData(API_CONSTANTS.GET_CHATS, this.handleChatState);

    let tempChat = [];

    socket.on("chat message", (msg, uname, senderId, receiver) => {
      console.log("getting from server");
      tempChat = [...this.state.messageList];
      tempChat.push({
        message: msg,
        sender: uname,
        receiver: receiver,
        senderId: senderId
      });
      this.setState({ messageList: tempChat });
    });

    let privateChat = [];
    socket.on(
      "private",
      (pmsg, sender, receiver, senderID, recieverID, recieverImg) => {
        console.log("inside private chat");
        console.log(this.props.chats);
        let recieverId = this.props.history.location.pathname.split("/");
        console.log(recieverId[2]);
        let previousConversation = [...this.props.chats];
        if (senderID === this.props.user._id && recieverID === recieverId[2]) {
          previousConversation.push({
            message: pmsg,
            sender: sender,
            receiver: receiver,
            senderId: senderID,
            recieverId: recieverID
          });
          this.setState({ conversations: previousConversation });
        }
        privateChat = [...this.state.privateMsgs];
        privateChat.push({
          message: pmsg,
          sender: sender,
          receiver: receiver,
          senderId: senderID,
          recieverId: recieverID
        });
        this.setState({
          privateMsgs: privateChat
        });
      }
    );

    socket.on("addRoom", groupData => {
      this.setState({ roomData: groupData });
    });

    socket.on("groupMessage", (msg, sender, groupName, groupId) => {
      let tempGroup = [...this.state.groupMsg];
      tempGroup.push({
        message: msg,
        sender: sender,
        receiver: groupName,
        recieverId: groupId
      });
      this.setState({ groupMsg: tempGroup });
    });
  };

  render() {
    return (
      <Layout>
        <div className="dashboard">
          <SideBar
            userList={this.state.userList}
            userInfo={this.state.userInformation}
            roomData={this.state.roomData}
          />
          <Switch>
            <Route
              exact
              path="/dashboard"
              render={() => (
                <div className="message-window">
                  <ChatList
                    listText={this.state.messageList}
                    currentUser={this.props.user}
                  />
                  <Form
                    handleChange={this.handleChange}
                    value={this.state.message}
                    sendMessage={this.sendMessage}
                  />
                </div>
              )}
            />

            <Route
              exact
              path="/dashboard/group/:room"
              render={routeProps => (
                <ChatRoom {...routeProps} grpMsg={this.state.groupMsg} />
              )}
            />

            <Route
              path="/dashboard/:id"
              render={routeProps => (
                <PrivateDashboard
                  {...routeProps}
                  listOfUsers={this.props.users}
                  privateMsg={this.state.privateMsgs}
                  conversations={this.state.conversations}
                />
              )}
            />
          </Switch>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    user: state.auth.user,
    chats: state.chats
  };
};

export default withRouter(connect(mapStateToProps)(Dashboard));
