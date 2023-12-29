const {
  User,
  schemas: { emailSchema },
} = require("../../Schemas/user");
const { HttpError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendVerifyToken = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw HttpError(400, "missing required field email");
  }
  const { error } = await emailSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
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
