const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();
const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(33).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .pattern(/^[0-9()]+$/, "numbers")
    .required(),
});
router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  return res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Contact not Found" });
  }
  return res.status(200).json(contact);
});

router.post("/", async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return res.status(400).json({ message: "missing required name field" });
  const newContact = await addContact(req.body);

  return res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const removedContact = await removeContact(req.params.contactId);
  if (removedContact) {
    return res.status(200).json({ message: "contact deleted" });
  }

  res.status(404).json({ message: "Not found!" });
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, phone } = req.body;

  if (!name && !email && !phone)
    return res.status(400).json({ message: "missing fields" });
  const response = await updateContact(req.params.contactId, req.body);

  if (response) return res.json(response);
  return res.status(404).json({ message: ` not found!` });
});

module.exports = router;
