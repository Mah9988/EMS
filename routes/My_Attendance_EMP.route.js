const router = require('express').Router();
const bodyParser = require('body-parser');
const MyAttendanceEmpController = require('../controllers/My_Attendance_EMP.controller')

router.get('/employee/My_Attendance_EMP' , MyAttendanceEmpController.getMyAttendanceEMP);

router.post(
    '/employee/My_Attendance_EMP',
    bodyParser.urlencoded({extended:true}),
    MyAttendanceEmpController.postMyAttendanceEMP
)

module.exports = router
