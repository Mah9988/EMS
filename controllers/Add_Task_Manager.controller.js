
const taskModel = require('../models/task.model')
const authModel = require('../models/auth.model')
var id
exports.getId = (id1)=>{ id = id1; }

let idd,name
exports.getIdAndName = (id1,name1)=>{
    idd = id1
    name = name1
}

exports.getAddTaskManager = (req,res,next)=>{
    taskModel.getTask().then(tasks =>{
        res.render('Add_Task_Manager',{
            id : id,
            task : tasks,
            idManager :idd,
            nameManager : name
        })
    })

}
let typeEMP
exports.postAddTaskManager = (req,res,next)=>{
    
    if(req.body.SendTaskManager){
        authModel.getNameById(req.body.empId).then((user)=>{
            nameSplit = user[0].split(' ')
            nameEmp = nameSplit[0] + ' ' + nameSplit[3]; 
            typeEMP = user[1] 
        }).then(()=>{
            let file
            if(req.file == undefined){
                 file = "null"}
                else if(req.file !=undefined)
                {
                    file = req.file.filename
                }
            taskModel.addTaskManager(req.body.empId,req.body.taskTitle,req.body.details,req.body.dueDate,req.body.dueTime,file,id,nameEmp,typeEMP).then(()=>{
                res.redirect('/manager/Add_Task_Manager')
            }).catch(err=>console.log(err))
        })
    
    }
    if(req.body.deleteTaskManagerBtn){
        taskModel.deleteTask(req.body.deleteTaskManagerBtn).then(()=>{
            res.redirect('/manager/Add_Task_Manager')
        }).catch(err=>console.log(err))
    }

}