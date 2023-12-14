const { Contact } = require("../../Schemas/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favourite } = req.query;
  const limitRecords = parseInt(limit);
  const skip = (page - 1) * limit;
  const listFavourites = favourite ? { favourite: [favourite] } : {};
  const contacts = await Contact.find({ owner, ...listFavourites })
    .skip(skip)
    .limit(limitRecords);
  res.json(contacts);
};

module.exports = getAll;
