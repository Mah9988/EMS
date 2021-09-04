const leaveModel = require('../models/leave.model')

let id,name
exports.getIdAndName = (id1,name1)=>{
    id = id1
    name=name1
}
exports.getAllRequestsleaveHR = (req,res,next)=>{
    leaveModel.getRequestLeaveHR().then((leaves)=>{
        res.render('All_Requests_leave_HR',{
            idHR : id,
            nameHR : name,
            leave : leaves
        })
    }).catch(err=>console.log(err))
    
}

exports.postAllRequestsleaveHR = (req,res,next)=>{
    if(req.body.sendLeave){    
        leaveModel.updateStatus(req.body.sendLeave,req.body.statusLeave).then(()=>{
            res.redirect("/HR/All_Requests_leave_HR")
        }).catch(err =>{
            console.log(err)
        })
    }
    if(req.body.deleteBtnLeave){
        leaveModel.deleteRequestLeave(req.body.deleteBtnLeave).then(()=>{
            res.redirect("/HR/All_Requests_leave_HR")
        }).catch(err=>console.log(err))
    }
    if(req.body.deleteTableLeave){
        leaveModel.deleteTableLeave().then(()=>{
            res.redirect("/HR/All_Requests_leave_HR")
        }).catch(err=>console.log(err))
    }
}
