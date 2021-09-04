const router = require('express').Router();
const bodyParser = require('body-parser');
const AllTaskManagerController  = require('../controllers/All_Task_Manager.controller')

router.get("/manager/All_Task_Manager",AllTaskManagerController.getAllTaskManager);

router.post(
    "/manager/All_Task_Manager",
    bodyParser.urlencoded({extended:true}),
    AllTaskManagerController.postAllTaskManager
);
module.exports = router