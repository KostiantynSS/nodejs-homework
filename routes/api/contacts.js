const express = require("express");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.addOne);

router.delete("/:contactId", ctrl.removeOne);

router.put("/:contactId", ctrl.updateOne);

module.exports = router;
