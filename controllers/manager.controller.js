const titleModel = require('../models/title.model')
const meetingModel = require('../models/meeting.model')
const noteModel = require('../models/note.model')
const authModel = require('../models/auth.model')
const taskModel = require('../models/task.model')
let id,name
exports.getIdAndName = (id1,name1)=>{
    id = id1
    name = name1
}

exports.getManager = (req, res, next) => {
        titleModel.getTitle().then(titles => {
            meetingModel.getMeeting().then(meetings => {
                noteModel.getNote(id).then(notes => {
                    authModel.getNumberOfEmployee(id).then((count)=>{
                        taskModel.getTaskDashboardManager().then((taskManager)=>{
                            res.render('manager', {
                                meeting: meetings,
                                title: titles,
                                note: notes,
                                idManager : id,
                                nameManager : name,
                                counts : count ,
                                tasks : taskManager
                            })
                        })
                    })
                })
            })
        }) 
}

exports.postManager = (req, res, next) => {

    if (req.body.titleOfNews && req.body.description) {
        titleModel.postTitle(req.body.titleOfNews, req.body.description)
            .then(() => {
                res.redirect("/manager");
            })
            .catch((err) => {
                console.log(err);
            });
    } else if (req.body.time && req.body.date && req.body.place && req.body.title) {

        meetingModel.addMeeting(req.body.time, req.body.date, req.body.place, req.body.title, "PENDING")
            .then(() => {
                res.redirect("/manager");
            })
            .catch((err) => {
                console.log(err);
            });
    } else if (req.body.deleteMeeting) {

        meetingModel.deleteMeeting(req.body.deleteMeeting).then(() => {
            res.redirect("/manager")
        }).catch(err => {
            console.log(err)
        })
    } else if (req.body.saveUpdateButtonMeeting  ){
        meetingModel.updateMeeting(req.body.saveUpdateButtonMeeting , req.body.updateTime, req.body.updateDate, req.body.updatePlace, req.body.udpateTitle).then(()=>{
            res.redirect('/manager')
        }).catch(err=>{
            console.log(err)
        })
    } else if (req.body.note) {
        noteModel.postNote(req.body.note,id).then(() => {
            res.redirect("/manager")
        }).catch(err => {
            console.log(err)
        })
    } else if (req.body.deleteNote) {
        noteModel.deleteNoteManager(req.body.deleteNote).then(() => {
            res.redirect('/manager')
        }).catch(err => {
            console.log(err)
        })
    } else if (req.body.updateNoteText) {
        noteModel.updateNoteMnagaer(req.body.saveUpdate, req.body.updateNoteText).then(() => {
            res.redirect('/manager')
        }).catch(err => {
            console.log(err)
        })
    }
};