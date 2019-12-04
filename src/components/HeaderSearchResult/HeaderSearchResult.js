import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserIinitalComponent from "../UserIinitalComponent/UserIinitalComponent";

class HeaderSearchResult extends Component {
  renderImageContainer = user =>
    user.avatarUrl ? (
      <img className="profile-image" src={user.avatarUrl} alt="user-profile" />
    ) : (
      <UserIinitalComponent className="profile-image" name={user.name[0]} />
    );

  render() {
    return (
      <div>
        {this.props.searchUsers.map(user => {
          return (
            <Link className="cards" to={`/user/${user._id}`}>
              <div className="header-seach-result-user-card">
                <div className="header-search-user-name">{user.name}</div>
                {this.renderImageContainer(user)}
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    searchUsers: state.searchUsers
  };
};
export default connect(mapStateToProps)(HeaderSearchResult);
