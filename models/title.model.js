const { escapeXML } = require("ejs");
const { Db } = require("mongodb");
const mongoose = require("mongoose");

const DB_URL = 'mongodb+srv://admin:admin123@cluster0.3wmdr.mongodb.net/EMS?retryWrites=true&w=majority'

const titleSchema = mongoose.Schema({
  titleOfNews: String,
  description: String
});

const title = mongoose.model("title", titleSchema);


exports.getTitle = () => {
  //connect to db
  //get title 
  //disconnect

  return new Promise((resolve,reject)=>{
      mongoose.connect(DB_URL).then(()=>{
       
        
          return title.findOne({})
        
          }).then(titles => {
            
              if(!titles){
              let titles=new title({titleOfNews:"No Title Yet",
              description : "No Description Yet"
            })
            titles.save()
            
            }else
              
              mongoose.disconnect()
              resolve(titles)
          }).catch(err=>reject(err))
          })
}


exports.postTitle = (titleOfNews, description) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        
        return title.updateOne(
          { titleOfNews: titleOfNews,
          description: description }
        );
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
};
