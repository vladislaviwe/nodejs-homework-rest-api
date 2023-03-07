const {Contact} = require("../../models/contact");

const listContacts = async (req, res, next) => {
      const {_id: owner} = req.user;
      const {page = 1, limit = 5, favorite} = req.query;
      const skip = (page - 1) * limit;

      const result = favorite 
        ? await Contact.find({owner, favorite}, "-createdAt -updatedAt", {skip, limit})
        .populate("owner", "name email")
        : await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit})
        .populate("owner", "name email");

      res.json(result);
  }

  module.exports = listContacts;