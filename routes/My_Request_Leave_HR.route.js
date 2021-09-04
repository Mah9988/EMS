const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer')
const MyRequestLeaveHRController = require('../controllers/My_Request_Leave_HR.controller')

router.get("/HR/My_Request_Leave_HR",MyRequestLeaveHRController.getMyRequestLeaveHR);
router.post('/HR/My_Request_Leave_HR',multer({storage : multer.diskStorage({destination : (req,file,cb)=>{cb(null,'files')},filename : (req,file,cb)=>{cb(null,Date.now()+'----'+file.originalname)}})}).single('fileLeave'),MyRequestLeaveHRController.postRequestleaveHR)

module.exports = router