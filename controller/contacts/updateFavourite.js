const { HttpError } = require("../../helpers/HttpError");
const { Contact, updateFavouriteSchema } = require("../../Schemas/contact");

const updateFavourite = async (req, res, next) => {
  const { error } = updateFavouriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing field favourite");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  res.json(updatedContact);
};
module.exports = updateFavourite;
