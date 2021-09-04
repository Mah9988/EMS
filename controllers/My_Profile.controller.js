const authModel = require('../models/auth.model')
const validationResult = require('express-validator').validationResult
const hrController = require('../controllers/HR.controller')
const addTaskHrController = require('../controllers/Add_Task_HR.controller')
const addTaskManagerController = require('../controllers/Add_Task_Manager.controller')
const AllRequestsleaveManagerController = require('../controllers/All_Request_Leave_Manager.controller')
const AllRequestsleaveHRController = require('../controllers/All_Requests_leave_HR.controller')
const allTaskHRController = require('../controllers/All_Task_HR.controller')
const allTaskManagerController = require('../controllers/All_Task_Manager.controller')
const attendanceLogHRController = require('../controllers/attendance_log_HR.controller')
const attendanceLogManagerController = require('../controllers/Attendance_Log_Manager.controller')
const EmpManagerController = require('../controllers/EMP_Manager.controller')
const empController = require('../controllers/emp.controller')
const hrEmpController = require('../controllers/hrEmp.controller')
const managerController = require('../controllers/manager.controller')
const MyAttendanceEmpController = require('../controllers/My_Attendance_EMP.controller')
const MyAttendanceHRController = require('../controllers/My_Attendance_HR.controller')
const MyRequestLeaveHRController = require('../controllers/My_Request_Leave_HR.controller')
const myTaskEmpController = require('../controllers/My_task_EMP.controller')
const myTaskHRController = require('../controllers/My_Task_HR.controller')
const RequestleaveEmpController = require('../controllers/Request_leave_EMP.controller')


let id,type
exports.getIdAndType = (id1,type1)=>{
    id = id1
    type= type1
}

exports.getMyProfile = (req,res,next)=>{
    authModel.geteditProfileInfo(id).then((user)=>{
        res.render("My_Profile",{
            user1 : user,
            idEmp : id,
            typeEmp : type,
            validiationErrors : req.flash('validiationErrors')
        })
    }).catch(err => console.log(err))
}

exports.postMyProfile = (req,res,next)=>{
    if(req.body.editProfileBtn){
        if(validationResult(req).isEmpty()){
            authModel.editProfile(id,req.body.email , req.body.name , req.body.birthDate , req.body.address , req.body.gender , req.body.PhoneNumber , req.body.image , req.body.password).then(()=>{
                let name = (req.body.name).split(' ');
                userName = name[0] + " " + name[3]
                if(type === 'employee'){
                    empController.getIdAndName(id,userName)
                    MyAttendanceEmpController.getIdAndName(id,userName)
                    myTaskEmpController.getIdAndName(id,userName)
                    RequestleaveEmpController.getIdAndName(id,userName)
                }
                if(type === 'hr'){
                    hrController.getIdAndName(id,userName)
                    addTaskHrController.getIdAndName(id,userName)
                    AllRequestsleaveHRController.getIdAndName(id,userName)
                    allTaskHRController.getIdAndName(id,userName)
                    attendanceLogHRController.getIdAndName(id,userName)
                    hrEmpController.getIdAndName(id,userName)
                    MyAttendanceHRController.getIdAndName(id,userName)
                    MyRequestLeaveHRController.getIDAndName(id,userName)
                    myTaskHRController.getIdAndName(id,userName)
                }
                if(type === 'manager'){
                    addTaskManagerController.getIdAndName(id,userName)
                    AllRequestsleaveManagerController.getIdAndName(id,userName)
                    allTaskManagerController.getIdAndName(id,userName)
                    attendanceLogManagerController.getIdAndName(id,userName)
                    EmpManagerController.getIdAndName(id,userName)
                    managerController.getIdAndName(id,userName)
                }
                res.redirect(type)
            }).catch(err => console.log(err))
        }else{
            req.flash('validiationErrors' , validationResult(req).array())
            res.redirect('My_Profile')
        }
}
}
