import React from "react";
import "./chatlist.css";
import PropTypes from "prop-types";

const ChatList = ({ listText }) => {
  return (
    <div className="chat-item">
      {listText.map((msgObj, index) => (
        <span key={index} className="message-data">
          <strong>{msgObj.sender} : </strong>
          {msgObj.message}
        </span>
      ))}
    </div>
  );
};

ChatList.propTypes = {
  listText: PropTypes.array
};

ChatList.defaultProps = {
  listText: []
};

export default ChatList;
