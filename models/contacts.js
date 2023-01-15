const { Contact } = require("../db/shema");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};
const addContact = async (body) => {
  const contact = new Contact({ ...body });
  contact.save();
  return contact;
};
const removeContact = async (id) => {
  return await Contact.findByIdAndRemove(id);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
