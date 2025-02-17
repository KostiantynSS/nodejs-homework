const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const {
  User,
  schemas: { registerSchema },
} = require("../../Schemas/user");
const { HttpError } = require("../../helpers");

const register = async (req, res, next) => {
  const { error } = await registerSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
