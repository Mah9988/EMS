const router = require('express').Router();
const bodyParser = require('body-parser');
const myTaskHRController = require('../controllers/My_Task_HR.controller')
const multer = require('multer');

router.get("/HR/My_Task_HR",myTaskHRController.getMyTaskHR);

router.post('/HR/My_Task_HR',multer({storage : multer.diskStorage({destination : (req,file,cb)=>{cb(null,'files')},filename : (req,file,cb)=>{cb(null,Date.now()+'----'+file.originalname)}})}).single('taskFile'),myTaskHRController.postTaskHR)

module.exports = router