const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const myRequestLeaveController = require('../controllers/Request_leave_EMP.controller');

router.get('/employee/Request_leave_EMP',myRequestLeaveController.getRequestleaveEmp)
router.post('/employee/Request_leave_EMP',multer({storage : multer.diskStorage({destination : (req,file,cb)=>{cb(null,'files')},filename : (req,file,cb)=>{cb(null,Date.now()+'----'+file.originalname)}})}).single('fileLeave'),myRequestLeaveController.postRequestleaveEmp)

module.exports = router