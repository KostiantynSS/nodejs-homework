const { HttpError } = require("../../helpers/HttpError");
const { Contact, addSchema } = require("../../Schemas/contact");

const updateOne = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const { _id: owner } = req.user;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: req.params.contactId, owner },
    req.body,
    { new: true }
  );
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

module.exports = updateOne;
