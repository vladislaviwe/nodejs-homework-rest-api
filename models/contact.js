const {Schema, model} = require('mongoose')
const Joi = require('joi');

const {handleMongooseErr} = require('../helpers')

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
        required: [true, 'Set email for contact'],
      },
      phone: {
        type: String,
        required: [true, 'Set phone for contact'],
        unique: true,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      }
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleMongooseErr)

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const updFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemas = {
    addSchema,
    updFavoriteSchema
}

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas
};