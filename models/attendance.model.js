const mongoose = require('mongoose');
const { ObjectID } = require('mongodb')
const DB_URL = 'mongodb+srv://admin:admin123@cluster0.3wmdr.mongodb.net/EMS?retryWrites=true&w=majority'

const attendanceSchema = mongoose.Schema({
    ID: String,
    Name: String,
    Date: String,
    Time: String,
    status : String,
    type : String
})

const Attendance = mongoose.model('attendance', attendanceSchema);

exports.getAttendanceDeatilesHR = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Attendance.find({type : {$ne: 'hr'}})
        }).then(attendance => {
            mongoose.disconnect()
            resolve(attendance)
        }).catch(err => reject(err))
    })
}
exports.getAttendanceDeatilesManager = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Attendance.find({})
        }).then(attendance => {
            mongoose.disconnect()
            resolve(attendance)
        }).catch(err => reject(err))
    })
}


exports.postAttendance = (ID,Name,Date,Time,type)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            let attendance = new Attendance({
                ID: ID,
                Name : Name,
                Date:Date,
                Time:Time
                ,type:type

            })
            return attendance.save();
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}

exports.getAttendanceDeatilesById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Attendance.find({ID : id})
        }).then(attendance => {
            mongoose.disconnect()
            resolve(attendance)
        }).catch(err => reject(err))
    })
}

exports.deleteAllRecords = ()=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Attendance.deleteMany({})
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}