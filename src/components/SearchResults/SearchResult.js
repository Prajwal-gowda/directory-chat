import React from "react";
import { NavLink } from "react-router-dom";
import UserIinitalComponent from "../UserIinitalComponent/UserIinitalComponent";

const SearchResult = props => {
  const { _id, name } = props.user;
  return (
    <div className="seach-result-user-card">
      <div
        className="search-user-name"
        onClick={() => props.addMemberToGroup()}
      >
        {name}
      </div>
    </div>
  );
};

export default SearchResult;
