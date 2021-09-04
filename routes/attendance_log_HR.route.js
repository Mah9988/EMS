const router = require('express').Router();
const bodyParser = require('body-parser');
const attendanceLogHRController = require('../controllers/attendance_log_HR.controller');

router.get("/HR/Attendance_Log_HR",attendanceLogHRController.getAttendanceLogHR);


router.post(
    "/HR/Attendance_Log_HR",
    bodyParser.urlencoded({extended:true}),
    attendanceLogHRController.postAttendanceLogHR
);
module.exports = router