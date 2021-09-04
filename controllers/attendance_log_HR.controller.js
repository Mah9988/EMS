const attendanceModel = require('../models/attendance.model')

let id,name 
exports.getIdAndName = (id1,name1)=>{
    id = id1
    name = name1
}

exports.getAttendanceLogHR = (req,res,next)=>{
    
    attendanceModel.getAttendanceDeatilesHR().then((attendance)=>{
        res.render('attendance_log_HR',{
            attendances : attendance,
            idHR : id,
            nameHR : name
        })
    }).catch(err => console.log(err))
    
    
}

exports.postAttendanceLogHR = (req,res,next)=>{
    if(req.body.deleteTableAttendance){
        attendanceModel.deleteAllRecords().then(()=>{
            res.redirect('/hr/attendance_log_HR')
        }).catch(err=>console.log(err))
    }
}