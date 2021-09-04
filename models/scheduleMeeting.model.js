const mongoose = require("mongoose");
const { ObjectID } = require('mongodb')


const DB_URL = 'mongodb+srv://admin:admin123@cluster0.3wmdr.mongodb.net/EMS?retryWrites=true&w=majority'

const titleSchema = mongoose.Schema({
    Name: String,
    phoneNumber: Number,
    companyName : String,
    Email : String,
    Time : String,
    Date : String
});

const scheduleMeeting = mongoose.model("scheduleMeeting", titleSchema);


        // get Date
exports.getScheduleMeeting = () => {
  //connect to db
  //get title
  //disconnect

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
        return scheduleMeeting.find({});
        }).then((scheduleMeetings) => {
        mongoose.disconnect();
        resolve(scheduleMeetings);
        }).catch((err) => reject(err));
    });
};


        // Add Data
exports.postScheduleMeeting = (Name,phoneNumber,companyName,Email,Time,Date)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            let newscheduleMeetings = new scheduleMeeting({
                Name: Name,
                phoneNumber:phoneNumber,
                companyName:companyName,
                Email:Email,
                Time:Time,
                Date:Date

            })
            return newscheduleMeetings.save();
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}


        // Delete Data
exports.deleteScheduleMeeting = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
        return scheduleMeeting.deleteOne({
            "_id": ObjectID(id)
        })
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}