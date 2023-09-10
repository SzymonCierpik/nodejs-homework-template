const { User } = require('../../models');
const { NotFound } = require('http-errors');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new NotFound('Not found verification token');
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: '' });

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification successful',
  });
};

module.exports = verifyEmail;