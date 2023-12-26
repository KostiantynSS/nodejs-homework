const { HttpError } = require("../../helpers/HttpError");
const { Contact, addSchema } = require("../../Schemas/contact");

const addOne = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "missing required name field");
  }

  const { _id: owner } = req.user;

  const newContact = await Contact.create({ ...req.body, owner });

  res.status(201).json(newContact);
};

module.exports = addOne;
