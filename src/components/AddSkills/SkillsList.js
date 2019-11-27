import React from "react";
import SkillsItem from "./SkillsItem";

const SkillsList = ({ items, onDeleteItem }) => {
  return (
    <div className="skills-list">
      {items.map(item => (
        <SkillsItem
          key={item.id}
          id={item.id}
          text={item.text}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </div>
  );
};
export default SkillsList;
