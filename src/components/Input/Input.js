import React from "react";
const Input = props => {
  return (
    <input
      className="input-fields"
      name={props.name}
      type={props.type}
      defaultValue={props.defaultValue}
      max={props.max}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
};
export default Input;
