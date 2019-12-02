import React, { Component } from "react";
import "./modal.css";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { socket } from "../../utils/socketConn";
import SearchBar from "../SearchBar/SearchBar";
import { connect } from "react-redux";
import MemberList from "../Addmembers/MemberList";

class Modal extends Component {
  state = {
    groupName: "",
    groupMembers: [],
    memberName: "",
    createdBy: {},
    currentRoom: {}
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  handleSend = () => {
    // this.props.handleChatRoomState(this.state.groupName);
    socket.emit(
      "joinGroup",
      this.state.currentRoom.groupId,
      this.state.currentRoom.groupname,
      this.state.groupMembers
    );
    this.props.handleClose();
  };

  addMemberToGroup = member => {
    let memberList = [...this.state.currentRoom.members],
      newMembers = [...this.state.groupMembers];
    if (memberList.includes(member.name) || newMembers.includes(member.name)) {
      console.log("user present");
    } else {
      newMembers.push(member.name);
      this.setState({ groupMembers: newMembers });
    }
  };

  componentDidMount = () => {
    console.log(this.state.currentRoom);
    this.setState({ createdBy: this.props.user });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    return {
      currentRoom: nextProps.currentRoom
    };
  }

  render() {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h1 className="form-header">{this.props.text}</h1>
          <form id="popupform" onClick={this.handleSubmit}>
            <SearchBar
              users={this.props.users}
              addMemberToGroup={this.addMemberToGroup}
            />
            <MemberList items={this.state.groupMembers} />

            <button className="submit-group" onClick={() => this.handleSend()}>
              Send
            </button>
          </form>
          <button
            className="close-btn"
            onClick={() => this.props.handleClose()}
          >
            X
          </button>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  text: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
};

Modal.defaultProps = {
  text: "",
  handleClose: () => {}
};

const mapStateToProps = state => {
  return {
    users: state.users,
    user: state.auth.user
  };
};

export default withRouter(connect(mapStateToProps)(Modal));
