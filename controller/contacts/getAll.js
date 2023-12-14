const { Contact } = require("../../Schemas/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  // const { page = 1, limit = 10, favourite = false } = req.query;

  const contacts = await Contact.find({ owner });
  res.json(contacts);
};

module.exports = getAll;
