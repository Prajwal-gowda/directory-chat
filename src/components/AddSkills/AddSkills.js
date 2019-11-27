import React from "react";
import SkillsList from "./SkillsList";
import "./addSkills.css";

class AddSkills extends React.Component {
  state = {
    text: ""
  };
  handleTextChange = event => {
    this.setState({
      text: event.target.value
    });
  };
  handleAddItem = event => {
    event.preventDefault();
    var newItem = {
      id: Date.now(),
      text: this.state.text
    };
    this.setState({ text: "" });
    this.props.handleAddSkills(newItem);
  };
  handleDeleteItem = itemId => {
    var updatedItems = this.props.skills.filter(item => {
      return item.id !== itemId;
    });
    this.props.handleDeleteSkills(updatedItems);
  };
  render() {
    return (
      <div className="add-skills-container">
        <SkillsList
          items={this.props.skills}
          onDeleteItem={this.handleDeleteItem}
        />
        <form onSubmit={this.handleAddItem} autoComplete="off">
          <input
            className="add-skills-input"
            type="text"
            placeholder="Add Skills"
            onChange={this.handleTextChange}
            value={this.state.text}
          />
        </form>
      </div>
    );
  }
}
export default AddSkills;
