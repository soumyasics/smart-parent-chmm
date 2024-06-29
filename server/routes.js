const express = require("express");
const router = express.Router();
const parent = require("./Parent/parentController");
const kids = require("./Kids/kidsController");
const hp = require("./HealthProfessionals/hpController");
const todo = require("./ToDoList/todoListController");
const vcController = require("./VaccinationCenters/vcController");
const parentAndVCChat = require("./MessageBwParentAndVC/messageController");
const ashaWorker = require("./AshaWorker/AshaWorkerController");
const vaccineController = require("./Vaccine/vaccineController");
const bookSlotController = require("./BookSlot/bookSlotController");
const subscriptionController = require("./SubscribeHp/subscribeController");
const tutroialController = require("./Tutorials/tutorialController");
const blogController = require("./blog/blogController");
const parentAndHPChatController = require("./MessageBwParentAndHP/messageController");
const vaccinationScheduleController = require("./nextVaccination/nextVaccinationController");
const hpRatingController = require("./rateHP/rateHPController");
const complaintController = require("./complaintHP/complaintHPController");
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
router.get("/getHPsAllSubscribers/:id", hp.getHPsAllSubscribers);

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
// Parent and vc conversation routes
router.post("/sendMessageParentAndVC", parentAndVCChat.sendMessageParentAndVC);
router.post("/getSingleConversation", parentAndVCChat.getSingleConversation);

// Parent and hp routes
router.post(
  "/sendMessageParentAndHP",
  parentAndHPChatController.sendMessageParentAndHP
);
router.post(
  "/getSingleConversationOfHPAndParent",
  parentAndHPChatController.getSingleConversation
);

// Asha workers

router.post(
  "/registerAW",
  ashaWorker.upload,
  validateEmailForRegistration,
  validatePassword,
  ashaWorker.registerAshaWorker
);
router.post("/loginAW", ashaWorker.loginAshaWorker);
router.patch(
  "/adminApprovedAWRequest/:id",
  validateMongooseId,
  ashaWorker.adminApprovedAshaWorkerRequest
);

router.patch(
  "/adminRejectedAWRequest/:id",
  validateMongooseId,
  ashaWorker.adminRejectedAshaWorkerRequest
);
router.patch(
  "/resetAWPasswordByEmail",
  ashaWorker.resetAshaWorkerPasswordByEmail
);
router.get("/getAllPendingAw", ashaWorker.getAllPendingAshaWorker);
router.get("/getAllApprovedAw", ashaWorker.getAllApprovedAshaWorker);
router.get("/getAllRejectedAw", ashaWorker.getAllRejectedAshaWorker);
router.get("/getAshaWorkerDataById/:id", ashaWorker.getAshaWorkerDataById);
router.patch(
  "/updateAshaWorkerById/:id",
  ashaWorker.upload,
  ashaWorker.updateAshaWorkerById
);

// add vaccines

router.post("/addNewVaccine", vaccineController.addNewVaccine);
router.get("/getVaccineById/:id", vaccineController.getVaccineById);
router.get(
  "/getAllVaccinesByCenterId/:id",
  validateMongooseId,
  vaccineController.getAllVaccinesByCenterId
);
router.get("/getAllVaccines", vaccineController.getAllVaccines);

router.post(
  "/getVaccinesByNameAndCenterName",
  vaccineController.getVaccinesByNameAndCenterName
);

// book slots
router.post("/bookSlot", bookSlotController.bookSlot);
router.get(
  "/getBookedSlotsByParent/:id",
  bookSlotController.getBookedSlotsByParent
);
router.get(
  "/getBookedSlotByVaccineCenter/:id",
  bookSlotController.getBookedSlotByVaccineCenter
);
router.get(
  "/getBookedSlotByVaccineId/:id",
  bookSlotController.getBookedSlotByVaccineId
);

router.post("/newSubscription", subscriptionController.newSubscription);
router.get("/getAllSubscriptions", subscriptionController.getAllSubscriptions);
router.get(
  "/getAllSubscriptionByParentId/:id",
  subscriptionController.getAllSubscriptionByParentId
);
router.get(
  "/getAllSubscriptionByHPId/:id",
  subscriptionController.getAllSubscriptionByHPId
);

router.post(
  "/getSubscriptionStatus",
  subscriptionController.getSubscriptionStatus
);

// Tutorials upload

router.post(
  "/uploadVideo",
  tutroialController.uploadVideo,
  tutroialController.addTutorial
);

router.get("/getAllTutorials", tutroialController.getAllTutorials);
router.get("/getTutorialsByHPId/:id", tutroialController.getTutorialsByHPId);
router.get("/getTutorialById/:id", tutroialController.getTutorialById);

// blog

router.post("/createBlog", blogController.upload, blogController.createBlog);
router.get("/getAllBlogs", blogController.getAllBlogs);
router.get("/getBlogById/:id", blogController.getBlogById);
router.get("/getBlogsByHPId/:id", blogController.getBlogsByHPId);

// route for vaccination schedule
router.post(
  "/vaccinationScheduleController",
  vaccinationScheduleController.createVaccinationSchedule
);
router.get(
  "/getVaccinationScheduleByParentId/:id",
  vaccinationScheduleController.getVaccinationScheduleByParentId
);

// rating

router.post("/addRating", hpRatingController.addRating);
router.get("/getAllRating", hpRatingController.getAllRating);
router.get("/getAllRatingByHPId/:id", hpRatingController.getAllRatingByHPId);

// complaints

router.post("/addComplaint", complaintController.addComplaint);
router.get("/getAllComplaints", complaintController.getAllComplaints);
router.get(
  "/getAllComplaintsByHPId/:id",
  complaintController.getAllComplaintsByHPId
);
module.exports = router;
