const express = require("express");

const ctrl = require("../../controller");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.addOne);

router.delete("/:contactId", ctrl.removeOne);

router.put("/:contactId", ctrl.updateOne);

router.patch("/:contactId/favorite", (req, res, next) => {
  res.json("ruki");
});

module.exports = router;
