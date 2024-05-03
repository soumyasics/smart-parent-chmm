const express=require('express')
const router=express.Router()
const parent=require('./Parent/parentController')

//Parent routes
router.post("/registerParent", parent.registerParent);
router.post("/loginParent", parent.loginParent);
router.post("/viewParentById/:id", parent.viewParentById);
router.post("/viewParents", parent.viewParents);
router.post("/editParentById/:id", parent.editParentById);
router.post("/deleteParentById/:id", parent.deleteParentById);
router.post("/forgotPwdParent", parent.forgotPwd);


module.exports = router;
