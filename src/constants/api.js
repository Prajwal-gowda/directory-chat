const BASE_URL = "http://localhost:4000";

export const API_CONSTANTS = {
  REGISTER_USER: `${BASE_URL}/register/create`,
  GET_USER_DATA: `${BASE_URL}/login`,
  GET_CHATS: `${BASE_URL}/dashboard`,
  GOOGLE_LOGIN_LANDING: `${BASE_URL}/`,
  GET_PRIVATE_CHATS: `${BASE_URL}/dashboard/private`,
  GET_GROUP_LIST: `${BASE_URL}/dashboard/grouplist`,
  GET_GROUP_MESSAGES: `${BASE_URL}/dashboard/groupmessage`,
  GET_USERLIST: `${BASE_URL}/dashboard/userlist`,
  GET_CURRENT_GROUP: `${BASE_URL}/dashboard/currentgroup`
};
