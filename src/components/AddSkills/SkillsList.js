import React from "react";
import SkillsListItem from "./SkillsListItem";

const SkillsList = ({ items, removeItem, ...props }) => {
  const renderFunc = () =>
    items.map((item, index) => (
      <SkillsListItem
        key={index}
        item={item}
        index={index}
        removeItem={removeItem}
      />
    ));

  return (
    <div className="skills-list">
      {items && items.length > 0 && renderFunc()}
    </div>
  );
};
export default SkillsList;
