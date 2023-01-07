const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.resolve(__dirname, "./contacts.json");

async function readData() {
  const data = await fs.readFile(contactsPath, "utf8");
  const result = await JSON.parse(data);
  return result;
}

const listContacts = async () => {
  try {
    const result = await readData();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const result = await readData();
    const contact = await result.find((item) => item.id === contactId);
    return contact;
  } catch (error) {
    console.error(error);
  }
};
const addContact = async (body) => {
  try {
    const result = await readData();
    const id = nanoid();
    const contactNew = { id, ...body };
    const newContactsList = [...result, contactNew];
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactsList, null, 2),
      "utf-8"
    );
    return contactNew;
  } catch (error) {
    console.log(error.message);
  }
};
const removeContact = async (contactId) => {
  try {
    const result = await readData();
    const delContact = await result.find((item) => item.id === contactId);
    if (delContact) {
      const index = result.indexOf(delContact);
      result.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(result), "utf-8");
      return delContact;
    }
    return null;
  } catch (e) {
    console.error(e);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const result = await readData();
    const oldContact = await result.find((item) => item.id === contactId);
    if (oldContact) {
      const updatedContact = { ...oldContact, ...body };
      const index = result.indexOf(oldContact);
      result.splice(index, 1, updatedContact);
      await fs.writeFile(contactsPath, JSON.stringify(result), "utf-8");
      return updatedContact;
    }
    return null;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
