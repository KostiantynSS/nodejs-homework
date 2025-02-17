const { HttpError } = require("../../helpers/HttpError");
const { Contact } = require("../../Schemas/contact");

const removeOne = async (req, res) => {
  const { _id: owner } = req.user;
  const contactToDelete = await Contact.findOneAndDelete({
    _id: req.params.contactId,
    owner,
  });
  if (!contactToDelete) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeOne;
