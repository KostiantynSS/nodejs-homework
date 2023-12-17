const { HttpError } = require("../../helpers/HttpError");
const { Contact } = require("../../Schemas/contact");

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const contactWithId = await Contact.findOne({
    _id: req.params.contactId,
    owner,
  });
  if (!contactWithId) {
    throw HttpError(404, "Not found");
  }
  res.json(contactWithId);
};
module.exports = getById;
