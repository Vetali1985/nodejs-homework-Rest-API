const express = require("express");

const {
  getContact,
  createContact,
  deleteContact,
  updateSomeContact,
  updateStatusContact,
  getAllContacts,
} = require("../../controllers/contactsContollers");
const { tryCatchWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");

const { contactsSchema, updateStatusSchema } = require("../../schema/contacts");

const router = express.Router();

router.get("/", tryCatchWrapper(getAllContacts));

router.get("/:contactId", tryCatchWrapper(getContact));

router.post("/", validateBody(contactsSchema), tryCatchWrapper(createContact));

router.delete("/:contactId", tryCatchWrapper(deleteContact));

router.put(
  "/:contactId",
  validateBody(contactsSchema),
  tryCatchWrapper(updateSomeContact)
);
router.patch(
  "/:contactId/favorite",
  validateBody(updateStatusSchema),
  tryCatchWrapper(updateStatusContact)
);

module.exports = router;
