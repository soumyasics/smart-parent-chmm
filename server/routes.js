const express = require("express");
const router = express.Router();
const parent = require("./Parent/parentController");
const kids = require("./Kids/kidsController");
const hp = require("./HealthProfessionals/hpController");
const todo = require("./ToDoList/todoListController");
const vcController = require("./VaccinationCenters/vcController");
const parentAndVCChat = require("./MessageBwParentAndVC/messageController");

const {
  validateEmailForLogin,
  validateEmailForRegistration,
  validatePassword,
  validateMongooseId,
} = require("./middlewares");

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

router.get("/getParentDataById/:id", parent.getParentDataById);
router.patch(
  "/updateParentDataById/:id",
  parent.upload,
  parent.updateParentById
);

router.get("/getAllParents", parent.viewAllParents);
router.post("/viewParentById/:id", parent.viewParentById);
router.post("/viewParents", parent.viewParents);
router.post("/editParentById/:id", parent.editParentById);
router.post("/deleteParentById/:id", parent.deleteParentById);
router.patch("/resetParentPasswordByEmail", parent.resetParentPasswordByEmail);

//Kids
router.post("/addKid", kids.upload, kids.addKid);
router.post("/viewKids", kids.viewKids);
router.get("/getAllKidsByParentId/:id", kids.getAllKidsByParentId);
router.post("/viewKidsByParentId/:id", kids.viewKidsByParentId);
router.post("/viewKidById/:id", kids.viewKidById);
router.post("/editKidById/:id", kids.upload, kids.editKidById);

//HP routes
router.post(
  "/registerHP",
  hp.upload,
  validateEmailForRegistration,
  validatePassword,
  hp.registerHP
);
router.post("/loginHP", hp.loginHP);
router.patch(
  "/adminApprovedHPRequest/:id",
  validateMongooseId,
  hp.adminApprovedHPRequest
);

router.patch(
  "/adminRejectedHPRequest/:id",
  validateMongooseId,
  hp.adminRejectedHPRequest
);
router.patch("/resetHPPasswordByEmail", hp.resetHPPasswordByEmail);
router.get("/getAllPendingHp", hp.getAllPendingHP);
router.get("/getAllApprovedHp", hp.getAllApprovedHP);
router.get("/getAllRejectedHp", hp.getAllRejectedHP);
router.get("/getHPDataById/:id", hp.getHPDataById);
router.patch("/updateHPById/:id", hp.uploadProfilePicture, hp.updateHPById);

router.post("/viewHpById/:id", hp.viewHpById);
router.post("/viewHps", hp.viewHps);
router.post("/editHPById/:id", hp.editHPById);
router.post("/deleteHpById/:id", hp.deleteHpById);
router.post("/forgotPwdHP", hp.forgotPwd);

//ToDo List
router.post("/addToDo", todo.addToDo);
router.post("/viewActivityById/:id", todo.viewActivityById);
router.post("/deleteToDOById/:id", todo.deleteToDOById);
router.get("/getTodoItemsByParentId/:parentId", todo.getTodoItemsByParentId);

//VC routes

router.post(
  "/registerVC",
  vcController.upload,
  validateEmailForRegistration,
  vcController.registerVC
);
router.post("/loginVC", validateEmailForLogin, vcController.loginVC);
router.patch(
  "/approveVCById/:id",
  validateMongooseId,
  vcController.approveVCById
);
router.patch(
  "/rejectVCById/:id",
  validateMongooseId,
  vcController.rejectVCById
);
router.patch("/resetVCPasswordByEmail", vcController.resetVCPasswordByEmail);

router.get("/getAllPendingVc", vcController.allPendingVC);
router.get("/getAllApprovedVc", vcController.allApprovedVC);
router.get("/getAllRejectedVc", vcController.allRejectedVC);
router.get("/getVCDataById/:id", vcController.getVCDataById);
router.patch(
  "/updateVCById/:id",
  vcController.upload,
  vcController.updateVCById
);

// Parent and vc conversation routes
router.post("/sendMessageParentAndVC", parentAndVCChat.sendMessageParentAndVC);
router.post("/getSingleConversation", parentAndVCChat.getSingleConversation);

module.exports = router;
