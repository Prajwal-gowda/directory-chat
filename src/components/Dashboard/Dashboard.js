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

class Dashboard extends Component {
  state = {
    messageList: [],
    message: "",
    userName: "",
    userList: [],
    userInformation: [],
    privateMsgs: []
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
    socket.on("private", (pmsg, sender, receiver) => {
      console.log("inside private chat");
      privateChat = [...this.state.privateMsgs];
      privateChat.push({ message: pmsg, sender: sender, receiver: receiver });
      this.setState({
        privateMsgs: privateChat
      });
    });
  };

  render() {
    return (
      <Layout>
        <div className="dashboard">
          <SideBar
            userList={this.state.userList}
            userInfo={this.state.userInformation}
          />
          <Switch>
            <Route
              exact
              path="/dashboard"
              render={() => (
                <div className="message-window">
                  <ChatList listText={this.state.messageList} />
                  <Form
                    handleChange={this.handleChange}
                    value={this.state.message}
                    sendMessage={this.sendMessage}
                  />
                </div>
              )}
            />

            <Route
              path="/dashboard/:id"
              render={routeProps => (
                <PrivateDashboard
                  {...routeProps}
                  listOfUsers={this.props.users}
                  privateMsg={this.state.privateMsgs}
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
    user: state.auth.user
  };
};

export default withRouter(connect(mapStateToProps)(Dashboard));
