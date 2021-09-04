const authModel = require('../models/auth.model')
const EditProfileController =require('../controllers/Edit_profile.controller')
const hrController = require('../controllers/HR.controller')
const empController = require('../controllers/emp.controller')
const MyAttendanceEmpController = require('../controllers/My_Attendance_EMP.controller')
const MyAttendanceHRController = require('../controllers/My_Attendance_HR.controller')
const myEmpTaskController = require('../controllers/My_task_EMP.controller')
const addTaskHrController = require('../controllers/Add_Task_HR.controller')
const addTaskManagerController = require('../controllers/Add_Task_Manager.controller')
const myTaskHRController = require('../controllers/My_Task_HR.controller')
const myTaskEmpController = require('../controllers/My_task_EMP.controller')
const RequestleaveEmpController = require('../controllers/Request_leave_EMP.controller')
const AllRequestsleaveHRController = require('../controllers/All_Requests_leave_HR.controller')
const allTaskHRController = require('../controllers/All_Task_HR.controller')
const attendanceLogHRController = require('../controllers/attendance_log_HR.controller')
const hrEmpController = require('../controllers/hrEmp.controller')
const MyRequestLeaveHRController = require('../controllers/My_Request_Leave_HR.controller')
const AllRequestsleaveManagerController = require('../controllers/All_Request_Leave_Manager.controller')
const allTaskManagerController = require('../controllers/All_Task_Manager.controller')
const attendanceLogManagerController = require('../controllers/Attendance_Log_Manager.controller')
const EmpManagerController = require('../controllers/EMP_Manager.controller')
const managerController = require('../controllers/manager.controller')
const myProfileController = require('../controllers/My_Profile.controller')
const validationResult = require('express-validator').validationResult

let IDEdit
let NameEdit
exports.getNameAndIDAfterEdit=(ID1,Name1)=>{
    IDEdit = ID1;
    NameEdit = Name1;
}

exports.getSignup = (req,res,next)=>{
    res.render("signup",{
        authError1 : req.flash('authError1')[0],
        validiationErrors : req.flash('validiationErrors')

    })
}

exports.postSignup = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
    authModel.createNewCompany(req.body.name,req.body.companyName,req.body.workEmail,req.body.phoneNumber).then(()=>{
        res.redirect('/home/signup')
        req.flash('authError1','submited succsssfully')
    }).catch(err=> {
        console.log(err)
        res.redirect('/home/signup')})
    }else{
        req.flash('validiationErrors' , validationResult(req).array())
        res.redirect('/home/signup')
    }
}       
exports.getLogin = (req,res,next)=>{
    res.render("login",{
        authError : req.flash('authError')[0]
    })
}

exports.postLogin = (req,res,next)=>{
    // if(req.session.userId){
    //     console.log('req.session.userId',req.session.userId);
    //     req.flash('authError','A user is already logged it, please log out first!')
    //     res.redirect("/home/login")
    // }
    // else
     authModel.login(req.body.email,req.body.password)
    .then((array)=>{
            
            //array[1] = user type
            //array[2] = user email
            //array[3] = user name
            //array[4] = user ID
            req.session.userId = array[0]
            if(array[1]==='hr'&& array[2]!==null){
                let name = array[3].split(' ')
                userName = name[0] + " " + name[3]
                hrController.getIdAndName(array[4],userName,array[1])
                MyAttendanceHRController.getIdAndName(array[4],userName,array[1])
                addTaskHrController.getId(array[4])
                myTaskHRController.getId(array[4])
                addTaskHrController.getIdAndName(array[4],userName)
                AllRequestsleaveHRController.getIdAndName(array[4],userName)
                allTaskHRController.getIdAndName(array[4],userName)
                attendanceLogHRController.getIdAndName(array[4],userName)
                hrEmpController.getIdAndName(array[4],userName)
                MyRequestLeaveHRController.getIDAndName(array[4],userName,array[1])
                myTaskHRController.getIdAndName(array[4],userName)
                myProfileController.getIdAndType(array[4],array[1])
                res.redirect('/HR')
            }
            else if(array[1]==='employee' && array[2]!=null){
                myEmpTaskController.getId(array[4])
                let name = array[3].split(' ')
                userName = name[0] + " " + name[3]
                empController.getIdAndName(array[4],userName)
                MyAttendanceEmpController.getIdAndName(array[4],userName,array[1])
                myTaskEmpController.getIdAndName(array[4],userName)
                RequestleaveEmpController.getIdAndName(array[4],userName,array[1])
                myProfileController.getIdAndType(array[4],array[1])
                res.redirect('/employee')
            }
            else if(array[1]==='manager'&& array[2]!=null){
                let name = array[3].split(' ');
                nameManager = name[0] + " " + name[3]
                addTaskManagerController.getId(array[4])
                addTaskManagerController.getIdAndName(array[4],nameManager)
                AllRequestsleaveManagerController.getIdAndName(array[4],nameManager)
                allTaskManagerController.getIdAndName(array[4],nameManager)
                attendanceLogManagerController.getIdAndName(array[4],nameManager)
                EmpManagerController.getIdAndName(array[4],nameManager)
                managerController.getIdAndName(array[4],nameManager)
                myProfileController.getIdAndType(array[4],array[1])
                res.redirect('/manager')
            }
            else if(array[2]==null){
                EditProfileController.getId(array[0],array[1])  
                res.redirect('/editProfile')

            }
            else if(array[0]=="admin" && array[1]=="admin")
            res.redirect('/adminTable')
            else 
            res.redirect('/home/login')

        }
    ).catch(err=>{
        //console.log(err);
        req.flash('authError',err)
        res.redirect("/home/login")
    })
}

const generateUniqueId = require('generate-unique-id');
const date =require('date-and-time')
const generatePassword = require('generate-password');
const hrEmpModel = require('../models/hrEmp.model')

exports.gethrEmp = (req,res,next)=>{
    hrEmpModel.getCreateEmp().then(emps=>{
        res.render('hrEmp',{
                emp:emps,
        })
    })
}

exports.posthrEmp = (req, res, next) => {
  //  console.log(req.body.create)
    if(req.body.create){
        
        const now = new Date();
        var id =date.format(now, 'YYYY').substring(1)+ generateUniqueId({
            length: 5,
            useLetters: false   
        });
        var password = generatePassword.generate({
            length: 6,
            numbers: true,
            uppercase:false
            
        });  
        hrEmpModel.createEmp(id,password).then(()=>{
            res.redirect('/HR/emp')
        }).catch(err=>{
            console.log(err)
        })
    }
    if(req.body.deleteEmpBtn){
        hrEmpModel.deleteCreateEmp(req.body.deleteEmpBtn).then(()=>{
            res.redirect("/HR/emp")
        }).catch(err =>{
            console.log(err)
        })
    }
    }

exports.logout = (req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/home/login')
    })
}