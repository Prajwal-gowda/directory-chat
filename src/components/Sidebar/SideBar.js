import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllUsers } from "../../store/actions";
import "./sidebar.css";

import PopUpForm from "../Popupform/PopUpForm";
import Modal from "../Modal/Modal";
import { ROUTE_CONSTANTS } from "../../constants/routepath";
import { API_CONSTANTS } from "../../constants/api";
import { DataHandle } from "../../utils/dataHandler";
import { Icon } from "antd";
import { nextTick } from "q";
import { object } from "prop-types";

class SideBar extends Component {
  state = {
    onlineUsers: [],
    showPopup: false,
    chatRooms: [],
    showModal: false,
    currentRoom: {}
  };

  onlineUsersData = [];

  handleChatRoomState = data => {
    this.setState({ chatRooms: data });
  };

  handlePopUpDisplay = () => {
    this.setState({ showPopup: true });
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  handleClose = () => {
    this.setState({ showPopup: false });
  };

  handleDashboardRoute = () => {
    this.props.history.push(ROUTE_CONSTANTS.DASHBOARD_ROUTE);
  };

  componentDidMount = () => {
    this.props.fetchAllUsers();

    DataHandle.getgroupList(
      API_CONSTANTS.GET_GROUP_LIST,
      this.handleChatRoomState
    );
  };

  inviteToGroup = room => {
    console.log("addded to group", room);
    this.setState({ currentRoom: room, showModal: true });
  };

  componentWillReceiveProps = nextProps => {
    let tempRooms = [...this.state.chatRooms];
    if (
      Object.keys(nextProps.roomData).length !==
      Object.keys(this.props.roomData).length
    ) {
      tempRooms.push(nextProps.roomData);
    }
    this.setState({ chatRooms: tempRooms });
  };

  componentDidUpdate = prevProps => {
    let listOfUsers = prevProps.userList,
      onlineUsers = [];
    listOfUsers.forEach(elem => {
      this.props.users.forEach(user => {
        if (user.name === elem) {
          onlineUsers.push(user);
          this.onlineUsersData.push(user);
        }
      });
    });
    console.log(onlineUsers);
    if (prevProps.userList !== this.props.userList) {
      this.setState({ onlineUsers: onlineUsers });
    }
  };

  render() {
    return (
      <div>
        <div className="sidebar">
          <Icon
            className="dashboard-icon"
            type="appstore"
            theme="twoTone"
            onClick={this.handleDashboardRoute}
          />

          <ul className="user-list">
            {this.props.userInfo.map((user, index) => (
              <NavLink
                className="link-elem"
                activeClassName="active-link"
                to={`${this.props.match.path}/${user._id}`}
                key={index}
              >
                <Icon type="user" className="user-icon" />
                {user.name}
              </NavLink>
            ))}
          </ul>

          <button
            className="create-group-btn"
            onClick={this.handlePopUpDisplay}
          >
            <Icon type="usergroup-add" className="create-group-icon" />
            Group
          </button>
          <h3 className="group-header">Groups : </h3>
          <ul className="user-list group-list">
            {this.state.chatRooms &&
              this.state.chatRooms.map((room, index) =>
                room.members.includes(this.props.user.name) ? (
                  <li key={index} className="link-elem">
                    <NavLink
                      className="navlink-element"
                      activeClassName="nav-active-link"
                      to={`${this.props.match.path}/group/${room.groupId}`}
                      key={index}
                    >
                      {room.groupname}
                    </NavLink>
                    <Icon
                      type="user-add"
                      className="user-add-icon"
                      onClick={() => this.inviteToGroup(room)}
                    />
                  </li>
                ) : null
              )}
          </ul>
        </div>

        {this.state.showPopup ? (
          <PopUpForm text="Create Group" handleClose={this.handleClose} />
        ) : null}
        {this.state.showModal ? (
          <Modal
            text={`Add Member to ${this.state.currentRoom.groupname}`}
            currentRoom={this.state.currentRoom}
            handleClose={this.handleModalClose}
          />
        ) : null}
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
  connect(mapStateToProps, mapDispatchToProps)(SideBar)
);
