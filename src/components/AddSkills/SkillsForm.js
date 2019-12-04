import React from "react";

class SkillForm extends React.Component {
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmitForm = event => {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;

    if (newItemValue) {
      this.props.addItem({ newItemValue });
      this.refs.form.reset();
    }
  };
  render() {
    return (
      <form
        ref="form"
        onSubmit={this.onSubmitForm}
        autoComplete="off"
        className="form-inline"
      >
        <input
          type="text"
          ref="itemName"
          className="add-skills-input"
          placeholder="Add Skill"
        />
        <button type="submit" className="add-button">
          <span>&#43;</span>
        </button>
      </form>
    );
  }
}
export default SkillForm;
