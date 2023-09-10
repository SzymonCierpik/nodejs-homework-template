const { User } = require("../../models");
const { verificationEmail } = require("./email");
const { BadRequest, NotFound } = require("http-errors");
const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound();
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }
  const VerifyToken = user.verificationToken;
  await verificationEmail(email, VerifyToken);
  res.json({
    status: "success",
    code: 200,
    email,
    message: "Verification email sent",
  });
};
module.exports = resendVerifyEmail;
