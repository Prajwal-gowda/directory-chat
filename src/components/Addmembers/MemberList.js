import React from "react";
import MemberItem from "./MemberItem";
import "./member.css";

const MemberList = ({ items }) => {
  return (
    <div className="members-list">
      {items.map(item => (
        <MemberItem
          key={Math.random()
            .toString(36)
            .substring(2, 15)}
          text={item}
        />
      ))}
    </div>
  );
};
export default MemberList;
