import React, { Component } from "react";
import "./popupform.css";
class PopUpForm extends Component {
  handleClose = () => {
    console.log("clicked");
  };

  render() {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h1 className="form-header">{this.props.text}</h1>
          <input type="text" />
          <button onClick={this.handleClose}>close</button>
        </div>
      </div>
    );
  }
}

export default PopUpForm;
