const bcrypt = require("bcrypt");

const createHashPassword = async (password) => {
  const result = await bcrypt(password, 10);
  const compareResult = await bcrypt.compare(password, result);
  if (compareResult) return result;
};
module.exports = createHashPassword;
