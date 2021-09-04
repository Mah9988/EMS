const titleModel = require('../models/title.model')
const meetingModel = require('../models/meeting.model')
const interviewModel = require('../models/interview.model')
const taskModel = require('../models/task.model')
const authModel = require('../models/auth.model')
const noteModel = require('../models/note.model')
const { json } = require('body-parser')
//var id

let idh
let nameh
let typeh
exports.getIdAndName=(id1,name1,type1)=>{
    idh = id1;
    nameh = name1
    typeh = type1
}

exports.getHR = (req,res,next)=> {
    
    titleModel.getTitle().then(titles => {
        meetingModel.getMeeting().then(meetings => {
            interviewModel.getInterview().then((interviews)=>{
                taskModel.getTask().then((tasks)=>{
                    taskModel.getTaskDashboardHR().then((tasksHR)=>{
                        authModel.getManagerIdById(idh).then((managerId)=>{
                            authModel.getNumberOfEmployee(managerId).then((count)=>{
                                noteModel.getNote(idh).then((notes)=>{
                                    res.render('HR', {
                                        meeting: meetings,
                                        title: titles,
                                        interview: interviews,
                                        nameHR : nameh,
                                        idHR : idh,
                                        typeHR : typeh,
                                        task : tasks,
                                        taskhr : tasksHR,
                                        counts : count,
                                        note : notes
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }) 
    })                  
}

exports.postHR = (req, res, next) => {
    if(req.body.place&&  req.body.title &&req.body.time && req.body.date){
        meetingModel.addMeeting(req.body.time,  req.body.date ,req.body.place , req.body.title, "PENDING").then(()=>{
            res.redirect('/HR')
        }).catch(err=>{
            console.log(err)
        })
    }else if(req.body.sureDeleteBtnMeeting) {
            meetingModel.deleteMeeting(req.body.sureDeleteBtnMeeting).then(()=>{
            res.redirect("/HR")
        }).catch(err =>{
            console.log(err)
        })
    }else if(req.body.saveUpdateButtonMeetingHr){
        meetingModel.updateMeeting(req.body.saveUpdateButtonMeetingHr, req.body.updateTimeHr , req.body.updateDateHr,req.body.updatePlaceHr ,req.body.updateTitleHr).then(()=>{
            res.redirect('/HR')
        }).catch(err =>{
            console.log(err)
        })
    }else if(req.body.candidate && req.body.schedule && req.body.Time && req.body.Date){
        interviewModel.addInterview(req.body.candidate , req.body.schedule , req.body.Time , req.body.Date , "PENDING").then(()=>{
            res.redirect('/HR')
        }).catch(err=>console.log(err))
    }else if(req.body.sureDeleteBtnInterview){
        interviewModel.deleteInterview(req.body.sureDeleteBtnInterview).then(() =>{
            res.redirect('/HR')
        }).catch(err=>{
            console.log(err)
        })
    }else if(req.body.saveUpdateButtonInterviewHr){
        interviewModel.updateInterviews(req.body.saveUpdateButtonInterviewHr , req.body.updateCandidate , req.body.updateSchedule , req.body.updateTime , req.body.updateDate).then(()=>{
            res.redirect('/HR')
        }).catch(err=>{
            console.log(err)
        })
    }else if(req.body.saveNote){
        noteModel.postNote(req.body.note,idh).then(()=>{
            res.redirect('/HR')
        }).catch(err=>{
            console.log(err)
        })
    }else if(req.body.updateNote){
        noteModel.updateNoteMnagaer(req.body.updateNote,req.body.note).then(()=>{
            res.redirect('/HR')
        }).catch(err=>console.log(err))
    }else if(req.body.deleteNote){
        noteModel.deleteNoteManager(req.body.deleteNote).then(()=>{
            res.redirect('/HR')
        }).catch(err=>console.log(err))
    }
}





