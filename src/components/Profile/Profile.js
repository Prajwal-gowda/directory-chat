import React from "react";
import axios from "axios";
import UserInfo from "../UserInfo/UserInfo";
import Layout from "../Layout/Layout";
import { connect } from "react-redux";
import "./profile.css";

class Profile extends React.Component {
  render() {
    return (
      <Layout>
        <div className="profile-body">
          <UserInfo editbtn="true" user={this.props.user} />
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
export default connect(mapStateToProps)(Profile);
