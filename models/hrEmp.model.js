//const { ObjectID } = require('mongodb')
const mongoose = require('mongoose')

const DB_URL = 'mongodb+srv://admin:admin123@cluster0.3wmdr.mongodb.net/EMS?retryWrites=true&w=majority'

const createEmpSchema =new mongoose.Schema({
    ID : String,
    password : String,
    type : String 
});

const createEmp  = mongoose.model('createEmp', createEmpSchema)
exports.createEmpHr=(id,password)=>{
   // console.log('donnnnnnneneee')
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            }).then(emp => {
                
                let create = new createEmp({
                    ID : id,
                    password : password,
                    type : 'employee'
                })
                return create.save();
                
            }).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch(err=>reject(err))
            })
}
        

exports.getCreateEmpHr = () => {
    //connect to db
    //get title 
    //disconnect

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return createEmp.find({})
            }).then(emp => {
                
                mongoose.disconnect()
                resolve(emp)
            }).catch(err=>reject(err))
            })
}


 
    exports.deleteCreateEmpHr = (id)=>{
        return new Promise((resolve,reject)=>{
            mongoose.connect(DB_URL).then(()=>{
                return createEmp.findByIdAndDelete(id)
                }).then( ()=> {
                    mongoose.disconnect()
                    resolve()
                }).catch(err=>reject(err))
                })
    }
    