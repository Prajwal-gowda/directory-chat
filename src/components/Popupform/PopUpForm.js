import React, { Component } from "react";
import "./popupform.css";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { socket } from "../../utils/socketConn";
import SearchBar from "../SearchBar/SearchBar";
import { connect } from "react-redux";
import MemberList from "../Addmembers/MemberList";

class PopupForm extends Component {
  state = {
    groupName: "",
    groupMembers: [],
    memberName: "",
    createdBy: ""
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  handleSend = () => {
    // this.props.handleChatRoomState(this.state.groupName);
    let groupId = Math.random()
      .toString(36)
      .substring(2, 15);
    socket.emit(
      "addRoom",
      groupId,
      this.state.groupName,
      this.state.groupMembers,
      this.state.createdBy
    );
    this.props.handleClose();
  };

  addMemberToGroup = member => {
    let memberList = [...this.state.groupMembers];
    if (memberList.includes(member.name)) {
      console.log("user present");
    } else {
      memberList.push(member.name);
      this.setState({ groupMembers: memberList });
    }
  };

  componentDidMount = () => {
    let initialMember = [];
    initialMember.push(this.props.user.name);
    this.setState({ createdBy: this.props.user, groupMembers: initialMember });
  };

  render() {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h1 className="form-header">{this.props.text}</h1>
          <form id="popupform" onClick={this.handleSubmit}>
            <input
              className="group-input-field"
              placeholder="enter group name"
              name="groupName"
              value={this.state.groupName}
              onChange={this.handleInputChange}
            />
            <SearchBar
              users={this.props.users}
              onClick={this.addMemberToGroup}
              customClass="custom-search-bar"
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

PopupForm.propTypes = {
  text: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
};

PopupForm.defaultProps = {
  text: "",
  handleClose: () => {}
};

const mapStateToProps = state => {
  return {
    users: state.users,
    user: state.auth.user
  };
};

export default withRouter(connect(mapStateToProps)(PopupForm));
