const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async(contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  async function listContacts () {
    const data = await fs.readFile(contactsPath)

    return JSON.parse(data);
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
  }
  
  async function addContact({name, email, phone}) {
    const contacts = await listContacts();
    if (!name || !email || !phone) {
      console.warn("One of the values is empty");
      return null;
    }
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }

    contacts.push(newContact);
    await updateContacts(contacts);

    return newContact;
  }

  async function updateContact(contactId, data) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    contacts[index] = {contactId, ...data};
    await updateContact(contacts);

    return contacts[index];
  }

  async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);

    return result;
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
  }