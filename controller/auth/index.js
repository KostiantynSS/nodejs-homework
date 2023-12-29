const current = require("./current");
const login = require("./login");
const logout = require("./logout");
const refresh = require("./refresh");
const register = require("./register");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");

module.exports = {
  login,
  logout,
  refresh,
  register,
  current,
  updateAvatar,
  verifyEmail,
};
