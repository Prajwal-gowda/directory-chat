import React from "react";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../../store/actions";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { connect } from "react-redux";
import UserIinitalComponent from "../UserIinitalComponent/UserIinitalComponent";
import ymlLogo from "../../assets/icn-logo3x.png";
import SearchBar from "../SearchBar/SearchBar";
import "./header.css";

class Header extends React.Component {
  renderImageContainer = () =>
    this.props.user.avatarUrl ? (
      <img
        className="profile-image"
        src={this.props.user.avatarUrl}
        alt="user-profile"
      />
    ) : (
      <UserIinitalComponent
        className="header-profile-user-image"
        // name={this.props.user.name[0]}
      />
    );
  logout = () => {
    this.props.logoutUser(this.props.history);
  };
  render() {
    return (
      <div className="navbar-container">
        <div className="navbar-header">
          <div className="logo-search">
            <Link to={ROUTES.HOME}>
              <img src={ymlLogo} className="yml-logo" alt="YML-logo" />
            </Link>
            {/* <SearchBar userId={userData._id} users={this.props.users} /> */}
          </div>
          <div className="profile-logout">
            <Link to={ROUTES.PROFILE}>
              <div className="profile-button">
                <button className="drop-down">
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                </button>
                {this.renderImageContainer()}
              </div>
            </Link>
            <button className="logout" type="button" onClick={this.logout}>
              Logout <i className="fa fa-sign-out" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logoutUser: history => dispatch(logoutUser(history))
  };
};
export default connect(null, mapDispatchToProps)(withRouter(Header));
