const { HttpError } = require("../../helpers/HttpError");
const { Contact, addSchema } = require("../../Schemas/contact");

const addOne = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "missing required name field");
  }
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

module.exports = addOne;
