const taskModel = require('../models/task.model')
const bodyParser = require('body-parser')

var id
exports.getId = (id1) => {
    id = id1;
}
let id1, name
exports.getIdAndName=(id2,name1)=>{
    id1 = id2;
    name = name1;
}


exports.getMyTaskEmp = (req, res, next) => {
    taskModel.getTask().then((tasks) => {
        res.render('My_task_EMP', {
            task: tasks,
            id: id,
            idEmp : id1,
            nameEmp : name
        })
    })
}
exports.postMyTaskEmp = (req,res,next)=>{
    let splitTask = (req.body.empUploadBtn).split(',')
    taskModel.empUploadTask(splitTask[0],req.file.filename,splitTask[1],splitTask[2]).then(()=>{
        res.redirect('/employee/My_task_EMP');
    }).catch(err=>{
        console.log(err)    
    })
}