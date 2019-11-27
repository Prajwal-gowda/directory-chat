import React from "react";
import { connect } from "react-redux";

const UsersList = ({ users }) => {
  if (!postMessage.length) {
    return <div>No Users Information</div>;
  }
  return <div>{users}</div>;
};

const mapStateToProps = state => {
  return {
    users: state.posts
  };
};

export default connect(mapStateToProps)(UsersList);
