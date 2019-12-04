import React from "react";
import SkillsList from "./SkillsList";
import SkillsForm from "./SkillsForm";
import "./addSkills.css";

class AddSkills extends React.Component {
  state = {
    skills: this.props.skills
  };

  addItem = todoItem => {
    this.props.skills.push(todoItem.newItemValue);
    this.setState({ skills: this.props.skills });
  };

  removeItem = itemIndex => {
    this.props.skills.splice(itemIndex, 1);
    this.setState({ skills: this.props.skills }, () =>
      console.log(this.props.skills)
    );
  };

  render() {
    return (
      <div id="main">
        <SkillsList items={this.props.skills} removeItem={this.removeItem} />
        <SkillsForm addItem={this.addItem} />
      </div>
    );
  }
}
export default AddSkills;
