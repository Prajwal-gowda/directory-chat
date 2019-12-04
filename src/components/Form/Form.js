import React, { Fragment } from "react";
import "./form.css";
import { Icon } from "antd";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

class Form extends React.Component {
  state = {
    showEmoji: false
  };

  handleEmojiDisplay = () => {
    this.setState(prevState => ({ showEmoji: !prevState.showEmoji }));
  };

  handleSubmit = event => {
    event.preventDefault();
    document.querySelector(".msg-form").reset();
    // this.props.sendMessage();
  };

  addEmoji = e => {
    console.log(e);
    this.props.handleEmojiAddition(e.native);
    this.handleEmojiDisplay();
  };

  render() {
    return (
      <Fragment>
        <form className="msg-form" onSubmit={this.handleSubmit}>
          {this.state.showEmoji ? (
            <Picker
              onSelect={this.addEmoji}
              style={{ position: "fixed", bottom: "50px", right: "50px" }}
            />
          ) : null}

          <input
            className="message-field"
            type="text"
            onChange={this.props.handleChange}
            value={this.props.value}
          />
          <button className="send-btn" onClick={this.props.sendMessage}>
            Send
          </button>
          <Icon
            type="meh"
            theme="filled"
            className="emoji-toggle-icon"
            onClick={this.handleEmojiDisplay}
          />
        </form>
      </Fragment>
    );
  }
}

// const Form = ({ handleChange, value, sendMessage, handleEmojiAddition }) => {
//   const handleSubmit = event => {
//     event.preventDefault();
//     document.querySelector(".msg-form").reset();
//   };

//   const addEmoji = e => {
//     console.log(e);
//     handleEmojiAddition(e.native);
//   };

//   return (
//     <Fragment>
//       <form className="msg-form" onSubmit={handleSubmit}>
//         <Picker
//           onSelect={addEmoji}
//           style={{ position: "fixed", bottom: "50px", right: "50px" }}
//         />
//         <input
//           className="message-field"
//           type="text"
//           onChange={handleChange}
//           value={value}
//         />
//         <button className="send-btn" onClick={sendMessage}>
//           Send
//         </button>
//         <Icon
//           type="meh"
//           theme="filled"
//           className="emoji-toggle-icon"
//           onClick={handleEmojiDisplay}
//         />
//       </form>
//     </Fragment>
//   );
// };

export default Form;
