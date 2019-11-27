import React from "react";
import { NavLink } from "react-router-dom";
import "./UserCard.css";
import UserIinitalComponent from "../UserIinitalComponent/UserIinitalComponent";

const UserCard = props => {
  const { _id, name, designation, avatarUrl } = props.user;
  const renderImageContainer = () =>
    props.user.avatarUrl ? (
      <img src={avatarUrl} alt="user-profile" />
    ) : (
      <UserIinitalComponent
        className="user-initial-display-container"
        name={name}
      />
    );
  return (
    <NavLink className="cards" to={`/user/${_id}`}>
      <div className="user-card-container">
        <div className="image-and-name">
          <div className="user-name-desig">
            <p className="user-name">{name}</p>
            {designation && <p className="user-designation">{designation}</p>}
          </div>
          {renderImageContainer()}
        </div>
      </div>
    </NavLink>
  );
};

export default UserCard;
