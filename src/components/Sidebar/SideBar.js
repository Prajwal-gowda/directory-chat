import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllUsers } from "../../store/actions";
import "./sidebar.css";

import { ROUTE_CONSTANTS } from "../../constants/routepath";
import { Icon } from "antd";

class SideBar extends Component {
  state = {
    onlineUsers: []
  };

  onlineUsersData = [];

  handleDashboardRoute = () => {
    this.props.history.push(ROUTE_CONSTANTS.DASHBOARD_ROUTE);
  };

  componentDidMount = () => {
    this.props.fetchAllUsers();
  };

  componentWillReceiveProps = nextProps => {};

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
