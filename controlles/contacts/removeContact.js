const contacts = require("../../service/contacts");
const { createError } = require("../../helpers/createError");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw createError(404);
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeContact;