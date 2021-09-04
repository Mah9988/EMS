const router = require('express').Router();
const bodyParser = require('body-parser');
const allTaskHRController = require('../controllers/All_Task_HR.controller')

router.get("/HR/All_Task_HR",allTaskHRController.getAllTaskHR);
router.post(
    "/HR/All_Task_HR",
    bodyParser.urlencoded({extended:true}),
    allTaskHRController.postAllTaskHR
);

module.exports = router