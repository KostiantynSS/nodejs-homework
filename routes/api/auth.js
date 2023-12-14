const express = require("express");
const { requestValidation, authenticate } = require("../../middleware");
const ctrl = require("../../controller/auth");

const router = express.Router();

router.post("/register", requestValidation(ctrl.register));
router.post("/login", requestValidation(ctrl.login));
router.post("/logout", authenticate, requestValidation(ctrl.logout));
router.get("/current", authenticate, requestValidation(ctrl.current));
// router.post("/refresh", authenticate, requestValidation(ctrl.refresh));

module.exports = router;
