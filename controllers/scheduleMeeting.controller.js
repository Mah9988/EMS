const ScheduleMeetingModel = require('../models/scheduleMeeting.model')
const validationResult = require('express-validator').validationResult




exports.getscheduleMeetiing = (req,res,next)=>{    
    res.render('ScheduleMeeting',{
        ScheduleMeetingError : req.flash('ScheduleMeetingError')[0],
        validiationErrors : req.flash('validiationErrors')

    })
}

exports.postScheduleMeetings = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
    ScheduleMeetingModel.postScheduleMeeting(
        req.body.Name,req.body.phoneNumber,req.body.companyName,req.body.Email,req.body.Time,req.body.Date).then(()=>{
        res.redirect('/home/ScheduleMeeting')
        req.flash('ScheduleMeetingError','submited succsssfully')
    }).catch(err=>{console.log(err)})
}else{
    req.flash('validiationErrors' , validationResult(req).array())
        res.redirect('/home/ScheduleMeeting')
}
}
