const { Contact } = require("../../Schemas/contact");

const getAll = async (req, res, next) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

module.exports = getAll;
