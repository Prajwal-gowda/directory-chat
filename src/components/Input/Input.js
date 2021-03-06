import React, { Component } from "react";

class Input extends Component {
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
    const { name, type, placeholder } = this.props;
    const { value } = this.state;
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={this.handleChange}
        className="input-field-profile"
      />
    );
  }
}

export default Input;
