// const BASE_URL = "http://localhost:8088";
const BASE_URL = "http://192.168.29.195:3000";
// const BASE_URL =
//   "https://7000-2405-201-200c-c118-e5da-37cb-d079-c4c1.in.ngrok.io";

export const apiUrl = {
  logIn: `${BASE_URL}/users/login`,
  getUser: `${BASE_URL}/users`,
  setUser: `${BASE_URL}/users`,
  editUser: `${BASE_URL}/users`,
  deleteUser: `${BASE_URL}/users`,
  addEvent: `${BASE_URL}/events`,
  getEvent: `${BASE_URL}/events/all`,
  getUserEvent: `${BASE_URL}/events`,
  editEvent: `${BASE_URL}/events`,
  deleteEvent: `${BASE_URL}/events`,
};
