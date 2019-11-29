import React from "react";

const MemberItem = ({ text }) => {
  const deleteItem = event => {
    console.log("deleted", event);
  };
  return (
    <div className="member-card-container">
      <label className="form-check-label">{text}</label>
      <button type="button" className="form-check-button" onClick={deleteItem}>
        x
      </button>
    </div>
  );
};
export default MemberItem;
