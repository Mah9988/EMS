const router = require('express').Router();
const bodyParser = require('body-parser');
const addTaskHRController = require('../controllers/Add_Task_HR.controller')
const multer = require('multer')
router.get("/HR/Add_Task_HR",addTaskHRController.getAddTaskHR);
router.post("/HR/Add_Task_HR",bodyParser.urlencoded({extended:true}),multer({storage : multer.diskStorage({destination : (req,file,cb)=>{cb(null,'files')},filename : (req,file,cb)=>{cb(null,Date.now()+'----'+file.originalname)}})}).single('taskFile'),addTaskHRController.postAddTaskHr)

module.exports = router