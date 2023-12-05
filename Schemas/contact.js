const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  favourite: Joi.boolean(),
});
const updateFavouriteSchema = Joi.object({
  favourite: Joi.boolean().required(),
});
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);
contactSchema.post("save", handleMongooseError);
const Contact = model("contact", contactSchema);

module.exports = { Contact, addSchema, updateFavouriteSchema };
