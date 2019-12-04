import React from "react";
import "./chatlist.css";
import PropTypes from "prop-types";
import avatarImg from "../../assets/avatar2.jpg";

const ChatList = ({ listText, currentUser }) => {
  let listOfChats = [];

  const getConversations = messages => {
    if (messages == undefined) {
      return;
    }

    const listItems = messages.map((message, index) => {
      let bubbleClass = "me";
      let bubbleDirection = "";

      if (message.type === 0) {
        bubbleClass = "you";
        bubbleDirection = "bubble-direction-reverse";
      }
      return (
        <div className={`bubble-container ${bubbleDirection}`} key={index}>
          <img className={`img-circle`} src={message.image} />
          <div className={`bubble ${bubbleClass}`}>
            <span className="sender-name"> {`${message.sender} : `} </span>
            {message.text}
          </div>
        </div>
      );
    });
    return listItems;
  };

  return (
    <div className="chat-item">
      {listText.forEach(msgObj => {
        if (msgObj.sender === currentUser.name) {
          listOfChats.push({
            type: 0,
            image: currentUser.avatarUrl,
            text: msgObj.message,
            sender: msgObj.sender
          });
        } else {
          listOfChats.push({
            type: 1,
            image: avatarImg,
            text: msgObj.message,
            sender: msgObj.sender
          });
        }
      })}
      {getConversations(listOfChats)}
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
