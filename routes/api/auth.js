const express = require("express");
const { requestValidation } = require("../../middleware");
const ctrl = require("../../controller/auth");

const router = express.Router();

router.post("/register", requestValidation(ctrl.register));
router.post("/login", requestValidation(ctrl.login));
router.post("/refresh", requestValidation(ctrl.refresh));
router.post("/logout", requestValidation(ctrl.logout));

module.exports = router;
