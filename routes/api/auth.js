const express = require("express");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const ctrl = require("../../controllers/auth");
const { validation } = require("../../middlewares");
const { schemas } = require("../../models/user");
const authMiddle = require("../../middlewares/authMiddle");

const router = express.Router();

router.post("/signup", validation(schemas.signup), ctrlWrapper(ctrl.signup));

router.post("/signin", validation(schemas.signin), ctrlWrapper(ctrl.signin));

router.get("/current", authMiddle, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authMiddle, ctrlWrapper(ctrl.logout));

router.patch("/", authMiddle, ctrlWrapper(ctrl.subUpdate));

module.exports = router;