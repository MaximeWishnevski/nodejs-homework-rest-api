const { User } = require("../../models/user");
const { createError } = require("../../helpers/createError");
const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcryptjs.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
const result = await User.create({ ...req.body, password: hashPassword });
res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;