const leaveModel = require('../models/leave.model')

let id,name,type

exports.getIDAndName = (id1,name1,type1)=>{
    id = id1
    name = name1
    type = type1
}

exports.getMyRequestLeaveHR = (req,res,next)=>{
    leaveModel.getRequestleave().then((leaves)=>{
        res.render('My_Request_Leave_HR',{
            idHR : id,
            nameHR : name,
            leave : leaves,
            typeHR : type
        })
    })
}


exports.postRequestleaveHR = (req,res,next)=>{
    let file
    if(req.file == undefined){
         file = "null"}
        else if(req.file !=undefined)
        {
            file = req.file.filename
        }
    let split = (req.body.saveBtnLeave).split(',')
    leaveModel.postRequestLeave(split[0],req.body.timeLeave,req.body.dateLeave,req.body.typeLeave,req.body.reasonLeave,file,split[1],split[2]).then(()=>{
        res.redirect('/HR/My_Request_Leave_HR')
    }).catch(err=>console.log(err))
}