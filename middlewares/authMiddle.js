const jwt = require("jsonwebtoken");
const { createError } = require("../helpers/createError");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authMiddle = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError(401);
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw createError(401);
      }
      req.user = user;
      next();
    } catch (error) {
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddle;