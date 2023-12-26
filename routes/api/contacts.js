const express = require("express");
const ctrl = require("../../controller/contacts/");
const {
  isValidId,
  requestValidation,
  authenticate,
} = require("../../middleware");

const router = express.Router();

router.get("/", authenticate, requestValidation(ctrl.getAll));
router.get(
  "/:contactId",
  authenticate,
  isValidId,
  requestValidation(ctrl.getById)
);
router.post(
  "/",
  authenticate,

  requestValidation(ctrl.addOne)
);
router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  requestValidation(ctrl.removeOne)
);
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  requestValidation(ctrl.updateOne)
);
router.patch(
  "/:contactId/favourite",
  authenticate,
  isValidId,
  requestValidation(ctrl.updateFavourite)
);

module.exports = router;
