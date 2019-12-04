import React from "react";
import { Link } from "react-router-dom";
import { fetchUser } from "../../store/actions";
import SkillsList from "../AddSkills/SkillsList";
import { connect } from "react-redux";
// import SkillsListItem from "../AddSkills/SkillsListItem";
import * as ROUTES from "../../constants/routes";
import UserIinitalComponent from "../UserIinitalComponent/UserIinitalComponent";
import "./userinfo.css";

class UserInfo extends React.Component {
  renderImageContainer = () =>
    this.props.user.avatarUrl ? (
      <img
        className="profile-photo"
        src={this.props.user.avatarUrl}
        alt="user-profile"
      />
    ) : (
      <UserIinitalComponent
        className="profile-user-image"
        name={this.props.user.name}
      />
    );
  render() {
    const user = this.props.user;
    return (
      <div className="profile-container">
        <div className="user-prifile-info">
          <div className="user-details">
            <div className="profile-image-name-designation">
              {this.renderImageContainer()}
              <div className="profile-name-designation">
                <div className="profile-name">{user.name}</div>
                <div className="profile-designation">{user.designation}</div>
              </div>
            </div>
            {this.props.editbtn ? (
              <Link to={ROUTES.EDIT_PROFILE}>
                <button className="edit-btn">Edit profile</button>
              </Link>
            ) : null}
          </div>
          <div className="edit-profile-email-phone">
            <p className="contact-info">CONTACT INFO</p>
            <div className="profile-email">
              <i className="fa fa-envelope-o"></i>
              <p className="profile-emailid">{user.emailId}</p>
            </div>
            <div className="profile-phone">
              <i className="fa fa-phone"></i>
              <p className="phone-number">+91 {user.phoneNumber}</p>
            </div>
          </div>
          <div className="edit-profile-id-dob-dept">
            <div>
              <label className="profile-label">EMPLOYEE ID</label>
              <div className="id-dob-dept">{user.employeeId}</div>
            </div>
            <div>
              <label className="profile-label">BIRTHDAY</label>
              <div className="id-dob-dept">{user.dob}</div>
            </div>
            <div>
              <label className="profile-label">DEPARTMENT</label>
              <div className="id-dob-dept">{user.department}</div>
            </div>
          </div>
          <div>
            <p className="profile-skills-header">SKILLS</p>
            {user.skills ? <SkillsList items={user.skills} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
