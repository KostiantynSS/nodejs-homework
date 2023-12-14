const { HttpError } = require("../../helpers/HttpError");
const { Contact, updateFavouriteSchema } = require("../../Schemas/contact");

const updateFavourite = async (req, res) => {
  const { error } = updateFavouriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing field favourite");
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

module.exports = updateFavourite;
