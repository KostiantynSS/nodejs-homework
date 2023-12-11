const { HttpError } = require("../../helpers/HttpError");
const { Contact } = require("../../Schemas/contact");

const removeOne = async (req, res, next) => {
  const contactToDelete = await Contact.findByIdAndDelete({
    _id: req.params.contactId,
  });
  if (!contactToDelete) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeOne;
