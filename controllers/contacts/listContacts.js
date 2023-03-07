const {Contact} = require("../../models/contact");

const listContacts = async (req, res, next) => {
      const {_id: owner} = req.user;
      const {page = 1, limit = 5, favorite} = req.query;
      const skip = (page - 1) * limit;

      const options = favorite ? {owner, favorite} : {owner}

      const result = await Contact.find(options, "-createdAt -updatedAt", {skip, limit})
                                  .populate("owner", "name email");

      res.json(result);
  }

  module.exports = listContacts;