const { HttpError } = require("../../helpers/HttpError");
const { Contact, updateFavouriteSchema } = require("../../Schemas/contact");

const updateFavourite = async (req, res, next) => {
  const { error } = updateFavouriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing field favourite");
  }
  const updatedContacts = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  res.json(updatedContacts);
};
module.exports = updateFavourite;
