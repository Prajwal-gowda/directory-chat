import React from "react";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon } from "antd";
import { ROUTE_CONSTANTS } from "../../constants/routepath";
import "./layout.css";

const Layout = props => {
  const handleIconClick = () => {
    props.history.push(ROUTE_CONSTANTS.DASHBOARD_ROUTE);
  };
  console.log(props.match.path);
  return (
    <div className="layout">
      <Header user={props.user} />
      {props.children}
      {props.match.path === ROUTE_CONSTANTS.HOME_ROUTE ? (
        <Icon
          type="message"
          theme="twoTone"
          className="chat-application-btn"
          onClick={handleIconClick}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
export default withRouter(connect(mapStateToProps)(Layout));
