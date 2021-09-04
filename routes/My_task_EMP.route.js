const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const myTaskEmpController = require('../controllers/My_task_EMP.controller')

router.get('/employee/My_Task_EMP',myTaskEmpController.getMyTaskEmp)
router.post('/employee/My_Task_EMP',multer({storage : multer.diskStorage({destination : (req,file,cb)=>{cb(null,'files')},filename : (req,file,cb)=>{cb(null,Date.now()+'----'+file.originalname)}})}).single('taskFile'),myTaskEmpController.postMyTaskEmp)

module.exports = router


