const express = require("express");
const router = express.Router();
const parent = require("./Parent/parentController");
const kids = require("./Kids/kidsController");
const hp = require("./HealthProfessionals/hpController");

const {
  validateEmailForRegistration,
} = require("./middlewares/validation/emailValidationForReg");
const {
  validatePassword,
} = require("./middlewares/validation/passwordValidation");
const {
  validateEmailForLogin,
} = require("./middlewares/validation/emailValidateForLogin");

// upload middleware should called & it should be first as well (if not other middlewares wont' work),
// upload middleware is responsible for populates req.body and req.file from the request.
router.post(
  "/registerParent",
  parent.upload,
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

//Kids
router.post("/addKid", kids.upload, kids.addKid);
router.post("/viewKids", kids.viewKids);
router.post("/viewKidsByParentId/:id", kids.viewKidsByParentId);
router.post("/viewKidById/:id", kids.viewKidById);
router.post("/editKidById/:id", kids.upload, kids.editKidById);

//HP routes
router.post("/registerHP", hp.upload, hp.registerHP);
router.post("/loginHP", hp.loginHP);
router.post("/viewHpById/:id", hp.viewHpById);
router.post("/viewHps", hp.viewHps);
router.post("/editHPById/:id", hp.editHPById);
router.post("/deleteHpById/:id", hp.deleteHpById);
router.post("/forgotPwdHP", hp.forgotPwd);
module.exports = router;
