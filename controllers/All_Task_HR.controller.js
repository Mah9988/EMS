const taskModel  = require('../models/task.model')

let id,name 
exports.getIdAndName = (id1,name1)=>{
    id = id1
    name = name1
}

exports.getAllTaskHR = (req,res,next)=>{
    taskModel.getTask().then((tasks)=>{
        res.render('All_Task_HR',{
            idHR : id,
            nameHR : name,
            task : tasks 
        })
    }).catch(err=>console.log(err))
    
}


exports.postAllTaskHR = (req,res,next)=>{
    if(req.body.empUploadBtn){
        taskModel.updateStatus(req.body.empUploadBtn,req.body.feedBackHR,req.body.statusHR).then(()=>{
            res.redirect('/HR/All_Task_HR')
        }).catch(err=>console.log(err))
    }
    if(req.body.deleteTableStatus){
        taskModel.deleteAllRecords().then(()=>{
            res.redirect('/manager/All_Task_Manager')
        }).catch(err=>console.log(err))
    }
}
