const attendanceModel = require('../models/attendance.model')


let id,name
exports.getIdAndName = (id1,name1)=>{
    id = id1
    name = name1
}


exports.getAttendanceLogManager = (req,res,next)=>{
    attendanceModel.getAttendanceDeatilesManager().then((attendance)=>{
        res.render("attendance_log_manager",{
            attendances : attendance,
            idManager : id,
            nameManager : name
        })
    }).catch(err => console.log(err))
}

exports.postAttendanceLogManager = (req,res,next)=>{
    if(req.body.deleteTableAttendanceManager){
        attendanceModel.deleteAllRecords().then(()=>{
            res.redirect('/manager/attendance_log_manager')
        }).catch(err=>console.log(err))
    }
}