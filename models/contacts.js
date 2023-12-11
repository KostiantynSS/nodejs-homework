const fs = require("fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const answer = await fs.readFile(contactsPath);
  const contacts = JSON.parse(answer);

  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactWithId = contacts.find((contact) => contact.id === contactId);

  return contactWithId;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactWithId = await getContactById(contactId);
  if (contactWithId) {
    const contactsNew = contacts.filter((contact) => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(contactsNew, null, 2));

    return contactWithId;
  } else {
    return null;
  }
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...body };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
