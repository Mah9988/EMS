const router = require('express').Router();
const bodyParser = require('body-parser');
const MyAttendanceHRController = require('../controllers/My_Attendance_HR.controller')

router.get("/HR/My_Attendance_HR",MyAttendanceHRController.getMyAttendanceHR);

router.post(
    '/HR/My_Attendance_HR',
    bodyParser.urlencoded({extended:true}),
    MyAttendanceHRController.postMyAttendanceHR
)
module.exports = router