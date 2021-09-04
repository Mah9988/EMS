const taskModel = require('../models/task.model')

var id
exports.getId = (id1) => { id = id1; }

let idd,name
exports.getIdAndName = (id1,name1)=>{
    idd = id1
    name = name1
}
exports.getMyTaskHR = (req,res,next)=>{
    taskModel.getTask().then((tasks) => {
        res.render('My_Task_HR', {
            task: tasks,
            id: id,
            idHR : idd,
            nameHR : name
        })
    })
}

exports.postTaskHR = (req,res,next)=>{
    let splitTask = (req.body.empUploadBtn).split(',')
    taskModel.empUploadTask(splitTask[0],req.file.filename,splitTask[1],splitTask[2]).then(()=>{
        res.redirect('/HR/My_Task_HR');
    }).catch(err=>{
        console.log(err)    
    })
}