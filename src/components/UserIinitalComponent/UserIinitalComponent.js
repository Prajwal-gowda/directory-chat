import React from "react";
import "./userInitial.css";

const UserIinitalComponent = props => (
  <div className={`${props.className}`}>
    <p>{props.name ? props.name[0] : null}</p>
  </div>
);
export default UserIinitalComponent;
