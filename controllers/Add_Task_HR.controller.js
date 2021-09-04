const taskModel = require('../models/task.model')
const validationResult = require('express-validator').validationResult

var id
exports.getId = (id1)=>{
id = id1;
}
let idd,name 
exports.getIdAndName = (id1,name1)=>{
    idd = id1,
    name = name1
}
const authModel =require('../models/auth.model')
let nameEmp ;
let typeEmp;

exports.getAddTaskHR = (req,res,next)=>{
    taskModel.getTask().then((tasks)=>{
        authModel.getManagerIdById(idd).then((managerId)=>{
            res.render('Add_Task_HR',{
                task : tasks,
                id : id,
                idHR : idd,
                nameHR : name,
                idManager : managerId,
                AddTaskHR : req.flash('AddTaskHR')[0],
            })
        })
    }) 
}
// authModel.getNameById(req.body.empId).then((user)=>{
//     console.log(user)
//     nameSplit = user.split(' ')
//     nameEmp = nameSplit[0] + ' ' + nameSplit[3];
//     console.log(nameEmp)
// })
exports.postAddTaskHr = (req,res,next)=>{
    if(req.body.saveBtnTask){
        authModel.getNameById(req.body.empId).then((user)=>{
            nameSplit = user[0].split(' ')
            nameEmp = nameSplit[0] + ' ' + nameSplit[3];  
            typeEmp = user[1];
        }).then(()=>{
            authModel.getManagerIdById(idd).then((managerId)=>{
                if(req.body.empId == managerId){
                    res.redirect('/hr/Add_Task_HR')
                    req.flash('AddTaskHR','-------')
                }
               else{
                let file
                if(req.file == undefined){
                     file = "null"}
                    else if(req.file !=undefined)
                    {
                        file = req.file.filename
                    }
                    
            taskModel.addTask(req.body.empId,req.body.taskTitle,req.body.details,req.body.dueDate,req.body.dueTime,file,id,nameEmp,typeEmp).then(()=>{
                
                res.redirect('/hr/Add_Task_HR');
            }).catch(err=>{
                console.log(err)    
            })
               }

            }).then(()=>{
              
    })
            })
        
    }

    if(req.body.deleteBtnTask){
        taskModel.deleteTask(req.body.deleteBtnTask).then(()=>{
            res.redirect('/hr/Add_Task_HR')
        }).catch(err=>console.log(err))
    }
    
    
    
}