const { User } = require('../../models');
const { sendEmail } = require('./sendEmail');
const { BadRequest, NotFound } = require('http-errors');

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound();
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }

  const mail = {
    to: email,
    subject: 'Verify email',
    html: `<a target = "_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email<a>`,
  };
  await sendEmail(mail);
  res.json({
    status: 'success',
    code: 200,
    email,
    message: 'Verification email sent',
  });
};

module.exports = resendVerifyEmail;