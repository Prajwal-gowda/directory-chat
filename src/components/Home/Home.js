import React from "react";
import axios from "axios";
import { fetchAllUsers } from "../../store/actions";
import { connect } from "react-redux";
import Layout from "../Layout/Layout";
import UserCard from "../UserCard/UserCard";

class HomePage extends React.Component {
  componentWillMount() {
    this.props.fetchAllUsers();
  }
  render() {
    return (
      <Layout>
        <div className="home-body">
          {this.props.users.map(user => {
            return <UserCard user={user} key={user._id} />;
          })}
        </div>
      </Layout>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
