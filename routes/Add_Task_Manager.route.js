const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const addTaskManagerController = require('../controllers/Add_Task_Manager.controller');

router.get("/manager/Add_Task_Manager",addTaskManagerController.getAddTaskManager);

router.post("/manager/Add_Task_Manager",multer({storage : multer.diskStorage({destination : (req,file,cb)=>{cb(null,'files')},filename : (req,file,cb)=>{cb(null,Date.now()+'----'+file.originalname)}})}).single('taskFile'),addTaskManagerController.postAddTaskManager)
module.exports = router ;