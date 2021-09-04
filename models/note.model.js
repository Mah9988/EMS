const {
    ObjectID
} = require('mongodb')
const mongoose = require('mongoose')

const DB_URL = 'mongodb+srv://admin:admin123@cluster0.3wmdr.mongodb.net/EMS?retryWrites=true&w=majority'

const meetingSchema = mongoose.Schema({
    note: String,
    empId : String
})


const Note = mongoose.model('note', meetingSchema)

/* Get Notes */
exports.getNote = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Note.find({empId : id})
        }).then(notes => {
            mongoose.disconnect()
            resolve(notes)
        }).catch(err => reject(err))
    })
}

/* Add Notes */
exports.postNote = (note , id) => {

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(notes => {
            let newNote = new Note({
                note: note,
                empId : id
            })
            return newNote.save();
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}

/* Delete Notes */
exports.deleteNoteManager = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Note.deleteOne({"_id": ObjectID(id)})
        }).then(() =>{ 
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}

/* Update Notes */
exports.updateNoteMnagaer = (id , note) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Note.updateOne(
                    {"_id":ObjectID(id)},
                    {$set :{
                        note : note
                    }});
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch((err) => {
                mongoose.disconnect();
                reject(err);
            });
    });
}