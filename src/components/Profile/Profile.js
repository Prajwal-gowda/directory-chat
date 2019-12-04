import React from "react";
import { Link } from "react-router-dom";
import { fetchUser } from "../../store/actions";
import { connect } from "react-redux";
import Layout from "../Layout/Layout";
import SkillsList from "../AddSkills/SkillsList";
import * as ROUTES from "../../constants/routes";
import UserIinitalComponent from "../UserIinitalComponent/UserIinitalComponent";
import "./profile.css";
import "../UserInfo/userinfo.css";

class Profile extends React.Component {
  componentDidMount() {
    const key = this.props.user._id;
    this.props.fetchUser(key);
  }
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
    const user = this.props.currentUser;
    return (
      <Layout>
        <div className="profile-body">
          <div className="profile-container">
            <div className="user-prifile-info">
              <div className="user-details">
                <div className="profile-image-name-designation">
                  {this.renderImageContainer()}
                  <div className="profile-name-designation">
                    <div className="profile-name">{user.name}</div>
                    <div className="profile-designation">
                      {user.designation}
                    </div>
                  </div>
                </div>
                <Link to={ROUTES.EDIT_PROFILE}>
                  <button className="edit-btn">Edit profile</button>
                </Link>
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
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
