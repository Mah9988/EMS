const router = require('express').Router();
const bodyParser = require('body-parser');
const attendanceLogManagerController = require('../controllers/Attendance_Log_Manager.controller');

router.get("/manager/attendance_log_manager",attendanceLogManagerController.getAttendanceLogManager);

router.post(
    "/manager/attendance_log_manager",
    bodyParser.urlencoded({extended:true}),
    attendanceLogManagerController.postAttendanceLogManager
);
module.exports = router