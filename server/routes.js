const express = require("express");
const router = express.Router();
const parent = require("./Parent/parentController");
const kids = require("./Kids/kidsController");
const hp = require("./HealthProfessionals/hpController");
const todo = require("./ToDoList/todoListController");
const vcController = require("./VaccinationCenters/vcController");

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

router.post("/loginHP", hp.loginHP);
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

module.exports = router;
