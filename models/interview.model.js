const { ObjectID } = require('mongodb')
const mongoose=require('mongoose')

const DB_URL = 'mongodb+srv://admin:admin123@cluster0.3wmdr.mongodb.net/EMS?retryWrites=true&w=majority'

const interviewSchema = mongoose.Schema({
    candidate : String,
    schedule : String, 
    time : String,
    date : String, 
    status : String
})

const interview = mongoose.model('interviews' , interviewSchema);

exports.getInterview = ()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return interview.find({})
            }).then(interviews => {
                mongoose.disconnect()
                resolve(interviews)
            }).catch(err=>reject(err))
        })
}

exports.addInterview = (candidate,schedule,time,date,status)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            }).then( ()=> {
                let interviews = new interview({
                    time : time,
                    date : date,
                    candidate : candidate, 
                    schedule : schedule,
                    status: status 
                })
                return interviews.save();
            }).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch(err=>reject(err))
        })
}

exports.updateInterviews = (id , candidate, schedule , time , date)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return interview.updateOne(
                {"_id":ObjectID(id)},
                {$set :{
                    time : time,
                    date : date,
                    candidate : candidate, 
                    schedule : schedule
                    }});
            }).then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch((err) => {
                mongoose.disconnect();
                reject(err);
            });
    });
}

exports.deleteInterview = (id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return interview.deleteOne({"_id": new ObjectID(id)})
            }).then( ()=> {
                mongoose.disconnect()
                resolve()
            }).catch(err=>reject(err))
        })
}