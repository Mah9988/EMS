const authModel = require('../models/auth.model');
const scheduleMeetingModel = require('../models/scheduleMeeting.model')
const generateUniqueId = require('generate-unique-id');
const date = require('date-and-time')
const generatePassword = require('generate-password');

exports.getAdminTable = (req,res,next)=>{
    authModel.getCompanyData().then(companies =>{
        scheduleMeetingModel.getScheduleMeeting().then((scheduleMeeting)=>{
            authModel.getAllUser().then((users)=>{
                res.render("adminTable",{
                    companies : companies,
                    scheduleMeeting :scheduleMeeting,
                    user: users
                })
            })
            
        })
    })
}

exports.postAdminTable = (req,res,next)=>{
    if(req.body.deleteRequest){
        authModel.deleteCompany(req.body.deleteRequest).then(()=>{
            res.redirect('adminTable')
        }).catch(err=>console.log(err))
    }
    if(req.body.deleteScheduleMeeting){
        scheduleMeetingModel.deleteScheduleMeeting(req.body.deleteScheduleMeeting).then(()=>{
            res.redirect('adminTable')
        }).catch(err=>console.log(err))
    }
        if (req.body.CreateManager) {
            const now = new Date(); 
            var id = date.format(now, 'YYYY').substring(1) + generateUniqueId({
                length: 5,
                useLetters: false
            });
            var password = generatePassword.generate({
                length: 6,
                numbers: true,
                uppercase: false
            });
            authModel.createManagerFromAdmin(id, password).then(() => {
                res.redirect('/adminTable')
            }).catch(err => {
                console.log(err)
            })
        }
        if(req.body.deleteCreateManagerBtn){
        authModel.deleteCreateManager(req.body.deleteCreateManagerBtn).then(()=>{
            res.redirect('/adminTable')
        }).catch(err => {
            console.log(err)
        }) 
        }
        if(req.body.editNumber){
            authModel.updateCount(req.body.editNumber,req.body.inputCount).then(()=>{
                res.redirect('/adminTable')
            }).catch(err=>console.log(err))
        }
}