const authmodel = require('../models/auth.model');
const empController = require('../controllers/emp.controller')
const MyAttendanceEmpController = require('../controllers/My_Attendance_EMP.controller')
const hrController = require('../controllers/HR.controller')
const MyAttendanceHRController = require('../controllers/My_Attendance_HR.controller')
const validationResult = require('express-validator').validationResult
const addTaskHrController = require('../controllers/Add_Task_HR.controller')
const addTaskManagerController = require('../controllers/Add_Task_Manager.controller')
const myEmpTaskController = require('../controllers/My_task_EMP.controller')
const myTaskHRController = require('../controllers/My_Task_HR.controller')
const myTaskEmpController = require('../controllers/My_task_EMP.controller')
const RequestleaveEmpController = require('../controllers/Request_leave_EMP.controller')
const AllRequestsleaveHRController = require('../controllers/All_Requests_leave_HR.controller')
const allTaskHRController = require('../controllers/All_Task_HR.controller')
const attendanceLogHRController = require('../controllers/attendance_log_HR.controller')
const hrEmpController = require('../controllers/hrEmp.controller')
const MyRequestLeaveHRController = require('../controllers/My_Request_Leave_HR.controller')
const myProfileController = require('../controllers/My_Profile.controller')
const AllRequestsleaveManagerController = require('../controllers/All_Request_Leave_Manager.controller')
const allTaskManagerController = require('../controllers/All_Task_Manager.controller')
const attendanceLogManagerController = require('../controllers/Attendance_Log_Manager.controller')
const EmpManagerController = require('../controllers/EMP_Manager.controller')
const managerController = require('../controllers/manager.controller')


var userId
var userName
var id
var type
exports.getId=(id1,type1)=>{
        id = id1;
        type = type1;
}

exports.getEditProfile = (req,res,next)=>{
        res.render('Edit_profile',{
                idForEdit:id,
                typeForEdit:type,
                validiationErrors : req.flash('validiationErrors')
        })
}        

exports.postEditProfile = (req,res,next)=>{

        if(req.body.editProfileBtn){
                if(validationResult(req).isEmpty()){
                const split = (req.body.editProfileBtn).split(',')
                authmodel.firstEditProfile(split[0] , req.body.email , req.body.name , req.body.birthDate , req.body.address , req.body.gender , req.body.PhoneNumber , req.body.image , req.body.password)
                .then(()=>{
                        authmodel.returnNameAfterUpdate(id).then((array)=>{
                        userId = array[0]
                        splitUserName = array[1].split(" ")
                        userName = splitUserName[0] + " " + splitUserName[3]
                        if(split[1] === 'employee'){
                                empController.getIdAndName(userId,userName)
                                MyAttendanceEmpController.getIdAndName(userId,userName,split[1])
                                myEmpTaskController.getId(userId) 
                                myTaskEmpController.getIdAndName(userId,userName)
                                RequestleaveEmpController.getIdAndName(userId,userName,split[1])
                                myProfileController.getIdAndType(userId,split[1])
                                
                        }
                        if(split[1] === 'hr'){
                                hrController.getIdAndName(userId,userName,split[1])
                                MyAttendanceHRController.getIdAndName(userId,userName,split[1])
                                addTaskHrController.getId(userId) 
                                myTaskHRController.getId(userId)
                                addTaskHrController.getIdAndName(userId,userName)
                                AllRequestsleaveHRController.getIdAndName(userId,userName)
                                allTaskHRController.getIdAndName(userId,userName)
                                attendanceLogHRController.getIdAndName(userId,userName)
                                hrEmpController.getIdAndName(userId,userName)
                                MyRequestLeaveHRController.getIDAndName(userId,userName,split[1])
                                myTaskHRController.getIdAndName(userId,userName)
                                myProfileController.getIdAndType(userId,split[1])
                        }
                        if(split[1] === 'manager'){
                                addTaskManagerController.getId(userId)
                                myProfileController.getIdAndType(userId,split[1])
                                addTaskManagerController.getIdAndName(userId,userName)
                                AllRequestsleaveManagerController.getIdAndName(userId,userName)
                                allTaskManagerController.getIdAndName(userId,userName)
                                attendanceLogManagerController.getIdAndName(userId,userName)
                                EmpManagerController.getIdAndName(userId,userName)
                                managerController.getIdAndName(userId,userName)
                        }
                        res.redirect('/' + split[1])
                        })
                })
                .catch(err => console.log(err))
        }else{
                req.flash('validiationErrors' , validationResult(req).array())
                res.redirect('editProfile')
        }
        }
}

