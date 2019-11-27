import React from "react";

const SkillsItem = ({ text, onDeleteItem, id }) => {
  const deleteItem = event => {
    onDeleteItem(id);
  };
  return (
    <div className="skill-card-container">
      <label className="form-check-label">{text}</label>
      {onDeleteItem ? (
        <button
          type="button"
          className="form-check-botton"
          onClick={deleteItem}
        >
          x
        </button>
      ) : null}
    </div>
  );
};
export default SkillsItem;
