const { HttpError } = require("../../helpers/HttpError");
const { Contact, addSchema } = require("../../Schemas/contact");

const updateOne = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const updatedContacts = await Contact.findByIdAndUpdate(
    { _id: req.params.contactId },
    req.body,
    { new: true }
  );
  res.json(updatedContacts);
};

module.exports = updateOne;
