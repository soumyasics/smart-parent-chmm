const express = require("express");
const router = express.Router();
const parent = require("./Parent/parentController");
const kids = require("./Kids/kidsController");


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
  parent.upload,
//   validateEmailForRegistration,
//   validatePassword,
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



//Kids
router.post("/addKid", kids.upload,kids.addKid);
router.post("/viewKids", kids.viewKids);
router.post("/viewKidsByParentId/:id", kids.viewKidsByParentId);
router.post("/viewKidById/:id", kids.viewKidById);
router.post("/editKidById/:id", kids.upload,kids.editKidById);


module.exports = router;

module.exports = router;
