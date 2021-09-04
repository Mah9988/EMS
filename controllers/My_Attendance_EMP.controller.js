const attendanceModel = require('../models/attendance.model')

let id
let name
let type
exports.getIdAndName=(id1,name1,type1)=>{
    id = id1;
    name = name1;
    type = type1
// console.log(id)
// console.log(name)
}

exports.getMyAttendanceEMP = (req,res,next)=>{
    attendanceModel.getAttendanceDeatilesById(id).then((attendance)=>{
        res.render('My_Attendance_EMP',{        
            nameEmp : name,
            idEmp : id,
            typeEmp : type,
            attendances : attendance
        })
    }).catch(err => console.log(err))
}

exports.postMyAttendanceEMP = (req,res,next)=>{
    dataButton = (req.body.startWorkBtn).split(',')
    attendanceModel.postAttendance(dataButton[0],dataButton[1],dataButton[2],dataButton[3],dataButton[4]).then(()=>{
        res.redirect('/employee/My_Attendance_EMP')
    }).catch(err=>console.log(err))
}