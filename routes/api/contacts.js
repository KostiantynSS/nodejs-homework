const express = require("express");

const ctrl = require("../../controller");
const isValidId = require("../../middleware");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", ctrl.addOne);

router.delete("/:contactId", isValidId, ctrl.removeOne);

router.put("/:contactId", isValidId, ctrl.updateOne);

router.patch("/:contactId/favourite", isValidId, ctrl.updateFavourite);

module.exports = router;
