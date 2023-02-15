const express = require('express');

const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateContact, isValidId } = require("../../middlewares");
const {schemas} = require("../../models/contact");

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/', validateContact(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', isValidId, validateContact(schemas.addSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', isValidId, validateContact(schemas.updFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router;