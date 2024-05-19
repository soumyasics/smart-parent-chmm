const express = require("express");
const router = express.Router();
const parent = require("./Parent/parentController");
const {
  validateEmailForRegistration,
} = require("./middlewares/validation/emailValidationForReg");
const {
  validatePassword,
} = require("./middlewares/validation/passwordValidation");
const {
  validateEmailForLogin,
} = require("./middlewares/validation/emailValidateForLogin");





//Parent routes
router.post(
  "/registerParent",
  validateEmailForRegistration,
  validatePassword,
  parent.registerParent
);
router.post(
  "/loginParent",
  validateEmailForLogin,
  validatePassword,
  parent.loginParent
);
router.post("/viewParentById/:id", parent.viewParentById);
router.post("/viewParents", parent.viewParents);
router.post("/editParentById/:id", parent.editParentById);
router.post("/deleteParentById/:id", parent.deleteParentById);
router.post("/forgotPwdParent", parent.forgotPwd);

module.exports = router;
