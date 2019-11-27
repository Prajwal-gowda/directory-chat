import React from "react";
import { NavLink } from "react-router-dom";
import UserIinitalComponent from "../UserIinitalComponent/UserIinitalComponent";

const SearchResult = props => {
  const renderImageContainer = () =>
    props.user.avatarUrl ? (
      <img
        className="profile-image"
        src={props.user.avatarUrl}
        alt="user-profile"
      />
    ) : (
      <UserIinitalComponent
        className="profile-image"
        name={props.user.name[0]}
      />
    );
  const { _id, name } = props.user;
  return (
    <NavLink className="cards" to={`/user/${_id}`}>
      <div className="seach-result-user-card">
        <div className="search-user-name">{name}</div>
        {renderImageContainer()}
      </div>
    </NavLink>
  );
};

export default SearchResult;
