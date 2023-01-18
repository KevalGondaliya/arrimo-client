const BASE_URL = "http://localhost:8088";

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
