const router = require('express').Router();
const bodyParser = require('body-parser');
const allRequestLeaveManagerController  = require('../controllers/All_Request_Leave_Manager.controller')

router.get("/manager/All_Request_Leave_Manager",allRequestLeaveManagerController.getAllRequestLeaveManager);
router.post("/manager/All_Request_Leave_Manager",bodyParser.urlencoded({extended:true}),allRequestLeaveManagerController.postAllRequestsleaveManager);


module.exports = router