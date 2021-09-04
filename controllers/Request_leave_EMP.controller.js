
const leaveModel = require('../models/leave.model')

let id1, name,type
exports.getIdAndName=(id2,name1,type1)=>{
    id1 = id2;
    name = name1;
    type = type1
}

exports.getRequestleaveEmp = (req,res,next)=>{
    leaveModel.getRequestleave().then((leaves)=>{
        res.render('Request_leave_EMP',{
            idEmp : id1,
            nameEmp : name,
            leave : leaves,
            typeEmp : type
        })
    })
}

exports.postRequestleaveEmp = (req,res,next)=>{  let file
    if(req.file == undefined){
         file = "null"}
        else if(req.file !=undefined)
        {
            file = req.file.filename
        }

    let split = (req.body.saveBtnLeave).split(',')
    leaveModel.postRequestLeave(split[0],req.body.timeLeave,req.body.dateLeave,req.body.typeLeave,req.body.reasonLeave,file,split[1],split[2]).then(()=>{
        res.redirect('/employee/Request_leave_EMP')
    }).catch(err=>console.log(err))
}