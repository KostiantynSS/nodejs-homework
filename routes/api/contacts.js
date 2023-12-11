const express = require("express");

const ctrl = require("../../controller/contacts/");
const { isValidId, requestValidation } = require("../../middleware");

const router = express.Router();

router.get("/", requestValidation(ctrl.getAll));

router.get("/:contactId", isValidId, requestValidation(ctrl.getById));

router.post("/", requestValidation(ctrl.addOne));

router.delete("/:contactId", isValidId, requestValidation(ctrl.removeOne));

router.put("/:contactId", isValidId, requestValidation(ctrl.updateOne));

router.patch(
  "/:contactId/favourite",
  isValidId,
  requestValidation(ctrl.updateFavourite)
);

module.exports = router;
