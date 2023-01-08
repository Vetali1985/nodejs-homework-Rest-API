const express = require("express");

const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateSomeContact,
} = require("../../controllers/contactsContollers");
const { tryCatchWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const { contactsSchema } = require("../../schema/contacts");

const router = express.Router();

router.get("/", tryCatchWrapper(getContacts));

router.get("/:contactId", tryCatchWrapper(getContact));

router.post("/", validateBody(contactsSchema), tryCatchWrapper(createContact));

router.delete("/:contactId", tryCatchWrapper(deleteContact));

router.put(
  "/:contactId",
  validateBody(contactsSchema),
  tryCatchWrapper(updateSomeContact)
);

module.exports = router;
