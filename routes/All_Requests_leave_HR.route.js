const router = require('express').Router();
const bodyParser = require('body-parser');
const allRequestsleaveHRController = require('../controllers/All_Requests_leave_HR.controller')

router.get("/HR/All_Requests_leave_HR",allRequestsleaveHRController.getAllRequestsleaveHR);
router.post("/HR/All_Requests_leave_HR",bodyParser.urlencoded({extended:true}),allRequestsleaveHRController.postAllRequestsleaveHR);

module.exports = router