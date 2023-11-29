const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const { HttpError } = require("../../helpers/HttpError");
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  try {
    const contactWithId = await getContactById(req.params.contactId);
    if (!contactWithId) {
      throw HttpError(404, "Not found");
    }
    res.json(contactWithId);
  } catch (error) {
    next(error);
  }
};
const addOne = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};
const removeOne = async (req, res, next) => {
  try {
    const contactToDelete = await removeContact(req.params.contactId);

    if (!contactToDelete) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};
const updateOne = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const updatedContacts = await updateContact(req.params.contactId, req.body);
    res.json(updatedContacts);
  } catch (error) {
    next(error);
  }
};
module.exports = { getAll, getById, addOne, removeOne, updateOne };
