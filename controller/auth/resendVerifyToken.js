const {
  User,
  schemas: { emailSchema },
} = require("../../Schemas/user");
const { HttpError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendVerifyToken = async (req, res) => {
  const { error } = await emailSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(401, "User is already verified");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/verify/${user.verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);
  res.json({ message: "Email sent success" });
};
module.exports = resendVerifyToken;
