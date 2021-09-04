const { ObjectID } = require('mongodb')
const mongoose=require('mongoose');
const { getRequestleaveEmp } = require('../controllers/Request_leave_EMP.controller');

const DB_URL = 'mongodb+srv://admin:admin123@cluster0.3wmdr.mongodb.net/EMS?retryWrites=true&w=majority'

const leaveSchema = mongoose.Schema({
    ID : String, 
    Time : String,
    Date : String,
    Reason : String,
    File : String,
    IdManager : String,
    IdHR : String,
    Type : String ,
    Status : String ,
    Name : String,
    TypeEMP : String 
})

const leave = mongoose.model('leaves' , leaveSchema);

exports.postRequestLeave = (ID , Time , Date , Type , Reason , File , Name ,TypeEMP)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            }).then( ()=> {
                let Request = new leave({
                    ID : ID,
                    Time : Time,
                    Date : Date,
                    Type : Type, 
                    Reason : Reason,
                    File: File ,
                    Status : "null",
                    Name : Name,
                    TypeEMP : TypeEMP
                })
                return Request.save();
            }).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch(err=>reject(err))
    })
}

exports.getRequestleave = ()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return leave.find({})
            }).then(leaves => {
                mongoose.disconnect()
                resolve(leaves)
            }).catch(err=>reject(err))
        })
}
exports.getRequestLeaveHR = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return leave.find({TypeEMP : {$ne: 'hr'}})
        }).then(leaves => {
            mongoose.disconnect()
            resolve(leaves)
        }).catch(err => reject(err))
    })
}

exports.updateStatus =(id,statusType)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
                return leave.findByIdAndUpdate(id,
                    {
                        Status : statusType 
                    });
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch((err) => {
                mongoose.disconnect();
                reject(err);
            });
    });
}

exports.deleteRequestLeave = (id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return leave.deleteOne({"_id": ObjectID(id)})
            }).then( ()=> {
                mongoose.disconnect()
                resolve()
            }).catch(err=>reject(err))
            })
}

exports.deleteTableLeave = ()=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return leave.deleteMany({})
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}