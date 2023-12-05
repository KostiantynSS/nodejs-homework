const { HttpError } = require("../helpers/HttpError");
const Contact = require("../models/contact");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const contactWithId = await Contact.findOne({ _id: req.params.contactId });
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
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const removeOne = async (req, res, next) => {
  try {
    const contactToDelete = await Contact.findByIdAndDelete({
      _id: req.params.contactId,
    });
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
    const updatedContacts = await Contact.findByIdAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { new: true }
    );
    res.json(updatedContacts);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAll,
  getById,
  addOne,
  removeOne,
  updateOne,
};
