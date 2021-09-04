const titleModel = require('../models/title.model')
const meetingModel = require('../models/meeting.model')
const taskModel = require('../models/task.model')
const authModel = require('../models/auth.model')
const noteModel = require('../models/note.model')
let id
let name
exports.getIdAndName=(id1,name1)=>{
    id = id1;
    name = name1;
// console.log(id)
// console.log(name)
}
// console.log(EditProfileController.getIDandName.name)

exports.getEmp = (req,res,next)=>{
    //get title
    //get meeting
    //render Emp.ejs
    titleModel.getTitle().then(titles=>{
        meetingModel.getMeeting().then(meetings=>{
            taskModel.getTask().then((tasks)=>{
                authModel.getManagerIdById(id).then((managerId)=>{
                    authModel.getNumberOfEmployee(managerId).then((count)=>{
                        noteModel.getNote(id).then((notes)=>{
                            res.render('employee',{
                                meeting: meetings,
                                title : titles,
                                nameEmp : name,
                                idEmp : id,
                                task : tasks,
                                counts : count,
                                note : notes
                            })
                        })
                    })
                })
            })
        })
    })
}

exports.postEMP = (req,res,next)=>{
     if(req.body.saveNote){
        noteModel.postNote(req.body.note,id).then(()=>{
            res.redirect('/employee')
        }).catch(err=>{
            console.log(err)
        })
    }else if(req.body.updateNote){
        noteModel.updateNoteMnagaer(req.body.updateNote,req.body.note).then(()=>{
            res.redirect('/employee')
        }).catch(err=>console.log(err))
    }else if(req.body.deleteNote){
        noteModel.deleteNoteManager(req.body.deleteNote).then(()=>{
            res.redirect('/employee')
        }).catch(err=>console.log(err))
    }
}

