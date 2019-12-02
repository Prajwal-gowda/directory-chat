import axios from "axios";

export const DataHandle = (function() {
  const postData = (url, userObject, handleUniqueRegister) => {
    axios
      .post(url, userObject)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
        handleUniqueRegister();
      });
  };

  const getData = (url, cb) => {
    axios
      .get(url)
      .then(res => {
        console.log(res.data);
        cb(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const authenticateUser = (url, userObject, cb) => {
    axios
      .post(url, userObject)
      .then(res => {
        console.log(res.data);
        cb(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const googgleAuthentication = (url, userObject, cb) => {
    axios
      .post(url, userObject)
      .then(res => {
        console.log(res.data);
        cb(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getPrivateMessages = (url, senderId, recieverId, cb) => {
    axios
      .get(url, {
        params: {
          senderId: senderId,
          recieverId: recieverId
        }
      })
      .then(res => {
        console.log(res.data);
        cb(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const getgroupList = (url, cb) => {
    axios
      .get(url)
      .then(res => {
        console.log(res.data);
        cb(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const getCurrentGroup = (url, groupId, cb) => {
    axios
      .get(url, {
        params: {
          groupId: groupId
        }
      })
      .then(res => {
        console.log(res.data);
        cb(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const getGroupMessages = (url, sender, groupId, cb) => {
    axios
      .get(url, {
        params: {
          sender: sender,
          groupId: groupId
        }
      })
      .then(res => {
        console.log(res.data);
        cb(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return {
    postData,
    getData,
    authenticateUser,
    googgleAuthentication,
    getPrivateMessages,
    getgroupList,
    getGroupMessages,
    getCurrentGroup
  };
})();
