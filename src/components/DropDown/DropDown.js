import React, { Component } from "react";

class DropDown extends Component {
  state = {
    value: ""
  };
  componentDidMount() {
    const { value } = this.props;
    if (value && value !== "") {
      this.setInitialValue();
    }
  }
  setInitialValue = () => {
    const { value } = this.props;
    this.setState({ value });
  };
  handleChange = ({ target }) => {
    const { onChange, name } = this.props;
    this.setState(
      {
        value: target.value
      },
      () => {
        const { value } = this.state;
        onChange(value, name);
      }
    );
  };
  render() {
    const { name, placeholder } = this.props;
    const { value } = this.state;
    return (
      <select
        name={name}
        className="custom-select"
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
      >
        <option value="iOS">iOS</option>
        <option value="Android">Android</option>
        <option value="Front End">Front End</option>
        <option value="Back End">Back End</option>
        <option value="HR">HR</option>
        <option value="Project manager">Project Manager</option>
        <option value="Project owner">Project Owner</option>
      </select>
    );
  }
}
export default DropDown;
