import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

const register = (username, email, name, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    name,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.auth_token) {
        localStorage.setItem("user", response.data.auth_token);
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
