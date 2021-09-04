const mongoose = require('mongoose')
const { ObjectID } = require('mongodb')

const DB_URL = 'mongodb+srv://admin:admin123@cluster0.3wmdr.mongodb.net/EMS?retryWrites=true&w=majority'

const taskSchema = mongoose.Schema({
    empId: String,
    taskTitle: String,
    details: String,
    dueDate: String,
    dueTime: String,
    file: String,
    hrId: String,
    sendFile: String,
    managerId : String,
    name : String ,
    timeSubmit : String,
    dateSubmit : String,
    feedBack : String,
    Status : String,
    typeEMP : String
})


const task = mongoose.model('task', taskSchema)

exports.addTask = (empId, taskTitle, details, dueDate, dueTime, file, hrId , name , typeEMP ) => {

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {}).then(tasks => {

            let tas = new task({
                empId: empId,
                taskTitle: taskTitle,
                details: details,
                dueDate: dueDate,
                dueTime: dueTime,
                file: file,
                hrId: hrId,
                sendFile: "null",
                name : name,
                timeSubmit : "null",
                dateSubmit : "null",
                feedBack : "null",
                Status :  "null",
                typeEMP : typeEMP
            })
            return tas.save();
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}

exports.getTask = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return task.find({});
            })
            .then((tasks) => {
                mongoose.disconnect();
                resolve(tasks);
            })
            .catch((err) => reject(err));
    });
};

exports.deleteTask = (id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return task.deleteOne({"_id": ObjectID(id)})
            }).then( ()=> {
                mongoose.disconnect()
                resolve()
            }).catch(err=>reject(err))
            })
}

exports.empUploadTask = (id, empUploadFile,time,date) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return task.findByIdAndUpdate(id, {
                    sendFile: empUploadFile,
                    timeSubmit : time,
                    dateSubmit : date
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

exports.addTaskManager = (empId, taskTitle, details, dueDate, dueTime, file, managerId,Name,typeEMP) => {

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {}).then(tasks => {

            let tas = new task({
                empId: empId,
                taskTitle: taskTitle,
                details: details,
                dueDate: dueDate,
                dueTime: dueTime,
                file: file,
                managerId: managerId,
                sendFile: "null",
                name : Name,
                timeSubmit : "null",
                dateSubmit : "null",
                feedBack : "null",
                Status : "null",
                typeEMP : typeEMP
            })
            return tas.save();
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}

exports.updateStatus = (id , feedBack , Status)=>{
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return task.findByIdAndUpdate(id, {
                    feedBack: feedBack,
                    Status : Status
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

exports.deleteAllRecords = ()=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return task.deleteMany({})
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}
exports.getTaskDashboardHR = ()=>{
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return task.find({typeEMP : { $ne : 'hr'}}).limit(5);
            })
            .then((tasksHR) => {
                mongoose.disconnect();
                resolve(tasksHR);
            })
            .catch((err) => reject(err));
    });
}
exports.getTaskDashboardManager = ()=>{
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return task.find({}).limit(5);
            })
            .then((taskManager) => {
                mongoose.disconnect();
                resolve(taskManager);
            })
            .catch((err) => reject(err));
    });
}
