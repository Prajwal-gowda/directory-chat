import React from "react";
import UserInfo from "../UserInfo/UserInfo";
import Layout from "../Layout/Layout";
import { connect } from "react-redux";

class UserDetails extends React.Component {
  getUserInfo() {
    const key = this.props.match.params.id;
    return this.props.users
      .filter(user => user._id === key)
      .map((user, i) => {
        return <UserInfo user={user} key={i} />;
      });
  }
  render() {
    return (
      <Layout>
        <div className="profile-body">{this.getUserInfo()}</div>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.users
  };
};
export default connect(mapStateToProps)(UserDetails);
