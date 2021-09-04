const leaveModel = require('../models/leave.model')

let id,name
exports.getIdAndName = (id1,name1)=>{
    id = id1
    name = name1
}

exports.getAllRequestLeaveManager = (req,res,next)=>{
    leaveModel.getRequestleave().then((leaves)=>{
        res.render('All_Request_Leave_Manager',{
            idManager :id,
            nameManager : name,
            leave : leaves
    })
    }).catch(err=>console.log(err))
}

exports.postAllRequestsleaveManager = (req,res,next)=>{
    if(req.body.sendLeave){    
        leaveModel.updateStatus(req.body.sendLeave,req.body.statusLeave).then(()=>{
            res.redirect("/manager/All_Request_Leave_Manager")
        }).catch(err =>{
            console.log(err)
        })
    }
    if(req.body.deleteBtnLeave){
        leaveModel.deleteRequestLeave(req.body.deleteBtnLeave).then(()=>{
            res.redirect("/manager/All_Request_Leave_Manager")
        }).catch(err=>console.log(err))
    }
    if(req.body.deleteTableLeave){
        leaveModel.deleteTableLeave().then(()=>{
            res.redirect("/manager/All_Request_Leave_Manager")
        }).catch(err=>console.log(err))
    }
}