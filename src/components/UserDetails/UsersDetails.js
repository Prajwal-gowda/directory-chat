import React from "react";
import UserInfo from "../UserInfo/UserInfo";
import { fetchAllUsers } from "../../store/actions";
import Layout from "../Layout/Layout";
import { connect } from "react-redux";

class UserDetails extends React.Component {
  componentDidMount() {
    this.props.fetchAllUsers();
  }
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
const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsers: id => dispatch(fetchAllUsers(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
