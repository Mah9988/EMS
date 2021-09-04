const { ObjectID } = require('mongodb')
const mongoose=require('mongoose')

const DB_URL = 'mongodb+srv://admin:admin123@cluster0.3wmdr.mongodb.net/EMS?retryWrites=true&w=majority'

const meetingSchema = mongoose.Schema({
    time: String,
    date : String,
    place: String,
    title: String,
    status: String
})


const meeting = mongoose.model('meeting',meetingSchema)

exports.getMeeting = () => {
    //connect to db
    //get title 
    //disconnect

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return meeting.find({})
            }).then(meetings => {
                
                mongoose.disconnect()
                resolve(meetings)
            }).catch(err=>reject(err))
            })
}

exports.addMeeting = (time , date ,place, title,status )=>{
    
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            }).then(meetings => {
                
                let meet = new meeting({
                    time : time,
                    date : date,
                    place : place, 
                    title : title,
                    status: status 

                })
                return meet.save();
            }).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch(err=>reject(err))
            })
}

exports.deleteMeeting = (id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return meeting.deleteOne({"_id": ObjectID(id)})
            }).then( ()=> {
                mongoose.disconnect()
                resolve()
            }).catch(err=>reject(err))
            })
}

exports.updateMeeting = (id ,time , date , place , title)=>{
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return meeting.updateOne(
                    {"_id":ObjectID(id)},
                    {$set :{
                        time: time,
                        date : date,
                        place: place,
                        title: title
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