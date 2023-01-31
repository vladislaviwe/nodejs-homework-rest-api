const express = require('express');

const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateContact } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

router.post('/', validateContact(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

router.put('/:contactId',validateContact(schemas.addSchema), ctrlWrapper(ctrl.updateContact));

module.exports = router