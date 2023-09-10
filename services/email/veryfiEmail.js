const { User } = require("../../models");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res, next) => {
  try {
    const verificationToken = req.params;
    const user = await User.findOneAndUpdate(verificationToken, {
      verify: true,
      verificationToken: null,
    });
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "User not found",
        user,
      });
    }
    res.status(200).json({
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
