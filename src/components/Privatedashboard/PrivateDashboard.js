import React, { Component, Fragment } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllUsers } from "../../store/actions";
import "./privatedashboard.css";

import ChatList from "../Chatlist/ChatList";
import Form from "../Form/Form";
import { socket } from "../../utils/socketConn";

class PrivateDashboard extends Component {
  state = {
    sender: {},
    recieverId: "",
    reciever: {},
    message: "",
    privateChat: []
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
    this.setState({ sender: this.props.user });
  };

  componentDidUpdate = prevProps => {
    let recieverId = prevProps.history.location.pathname.split("/");
    if (this.state.recieverId !== recieverId[2]) {
      this.setState({ recieverId: recieverId[2] });
      let recieverObj = this.props.users.filter(
        user => user._id === recieverId[2]
      );
      this.setState({ reciever: recieverObj[0] });
    }
  };

  componentWillReceiveProps = nextProps => {
    let recieverId = nextProps.history.location.pathname.split("/");
    let recieverObj = nextProps.users.filter(
      user => user._id === recieverId[2]
    );
    this.setState({
      reciever: recieverObj[0],
      privateChat: nextProps.privateMsg
    });
  };

  //   static getDerivedStateFromProps(nextProps, prevState) {
  //     console.log(nextProps.listOfUsers);
  //     let recieverId = nextProps.history.location.pathname.split("/");
  //     console.log(recieverId);
  //     let recieverObj = nextProps.users.filter(
  //       user => user._id === recieverId[2]
  //     );
  //     console.log(recieverObj[0]);
  //     this.setState({ reciever: recieverObj[0] });
  //   }

  render() {
    return (
      <div className="message-window">
        <h2 className="reciever-name">
          {this.state.reciever && this.state.reciever.name}
        </h2>
        <ChatList listText={this.state.privateChat} />
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
