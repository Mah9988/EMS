const attendanceModel = require('../models/attendance.model')

let idh
let nameh
let typeh
exports.getIdAndName=(id1,name1,type1)=>{
    idh = id1;
    nameh = name1;
    typeh = type1
}

exports.getMyAttendanceHR = (req,res,next)=>{
    attendanceModel.getAttendanceDeatilesById(idh).then((attendance)=>{
        res.render('My_Attendance_HR',{        
            nameHR : nameh,
            idHR : idh,
            typeHR : typeh,
            attendances : attendance
        })
    }).catch(err => console.log(err))
}

exports.postMyAttendanceHR = (req,res,next)=>{
    dataButton = (req.body.startWorkBtnHR).split(',')
    attendanceModel.postAttendance(dataButton[0],dataButton[1],dataButton[2],dataButton[3],dataButton[4]).then(()=>{
        res.redirect('/hr/My_Attendance_HR')
    }).catch(err=>console.log(err))
}
