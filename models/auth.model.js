const authController = require('../controllers/auth.controller')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
    ObjectID
} = require('mongodb')
const DB_URL = 'mongodb+srv://admin:admin123@cluster0.3wmdr.mongodb.net/EMS?retryWrites=true&w=majority'

const signSchema = mongoose.Schema({
    name: String,
    companyName: String,
    workEmail: String,
    phoneNumber: Number,
})
const userSchema = mongoose.Schema({
    email: String,
    name: String,
    birthDate: String,
    address: String,
    gender: String,
    type: String,
    phone: String,
    managerId: String,
    image: String,
    password: String,
    ID: String,
    count : Number,
    balance : Number
}, {
    collection: 'users'
})

const Company = mongoose.model('company', signSchema);

const User = mongoose.model('', userSchema);

/*Signup*/

exports.createNewCompany = (name, companeName, workEmail, phoneNumber) => {
    // chek if email exists : Yes = error else create
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Company.findOne({
                /*email:email*/
            })
        }).then(hashedPassword => {
                let company = new Company({
                    name: name,
                    companyName: companeName,
                    workEmail: workEmail,
                    phoneNumber: phoneNumber
                })
                return company.save();
            }

        ).then(() => {
            mongoose.disconnect()
            resolve();
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })

}

/* Send company data */

exports.getCompanyData = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Company.find({})
        }).then(companies => {
            mongoose.disconnect()
            resolve(companies)
        }).catch(err => reject(err))
    })
}
exports.deleteCompany = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Company.deleteOne({
                "_id": ObjectID(id)
            })
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}

// Update Data
exports.updateCompany = (id, companyName, workEmail, phoneNumber) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Company.updateOne({
                "_id": ObjectID(id)
            }, {
                $set: {
                    companeName: companyName,
                    workEmail: workEmail,
                    phoneNumber: phoneNumber
                }
            });
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

/* login */


exports.login = (email, password) => {
    
    // Check for email
    //yes--->check pass
    //no ----> check for id
    //no ----> error
    // yes ---> check pass
    // 
    // no --> Error 
    // yes --> chek pass 
    // no--> error
    // yes ====> set session
    // 
    /*bcrypt.hash('bb',10).then(hash=>
       {console.log(hash)})*/

    //console.log(';;;;;;;;;kmlm;lm;m'/*bcrypt.hash('bb',10)*/)
    return new Promise((resolve, reject) => {
        if(email=="admin" && password=="admin")
        resolve([email,password,email])
        mongoose.connect(DB_URL).then(() =>
            User.findOne({
                $or: [{
                    email: email
                }, {
                    ID: email
                }]
            })
        ).then(user => {
            //   console.log(user)
            if (!user) {
                mongoose.disconnect()
                reject('The ID, or Email you entered did not match our records. Please double-check and try again.')
            } else {
                if (password === user.password) {
                    mongoose.disconnect()
                    resolve([user._id, user.type, user.email, user.name, user.ID])
                } else {
                    bcrypt.compare(password, user.password).then(same => {
                        //if(password!==user.password){
                        if (!same) {
                            mongoose.disconnect()
                            reject('password is incorrect')
                        } else {
                            mongoose.disconnect()
                            resolve([user._id, user.type, user.email, user.name, user.ID])
                           
                        }
                    })
                }
            }
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}

exports.createEmpHr = (id, password,managerOfId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {}).then(emp => {
            let create = new User({
                ID: id,
                password: password,
                type: 'employee',
                email: null,
                name: null,
                birthDate: null,
                address: null,
                gender: null,
                phone: null,
                managerId: managerOfId,
                image: null
            })
            return create.save();
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}


exports.getCreateEmpHr = () => {
    //connect to db
    //get title 
    //disconnect
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.find({
                email: null,
                type: 'employee'
            })
        }).then(emp => {
            mongoose.disconnect()
            resolve(emp)
        }).catch(err => reject(err))
    })
}

exports.deleteCreateEmpHr = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findByIdAndDelete(id)
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}

/* Manager Create EMP  */
exports.createManagerEmp = (id, password, idOfManager) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {}).then(emp => {
            let create = new User({
                ID: id,
                password: password,
                type: 'employee',
                email: null,
                name: null,
                birthDate: null,
                address: null,
                gender: null,
                phone: null,
                managerId: idOfManager,
                image: null
            })
            return create.save();
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}
exports.getCreateManagerEmp = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.find({
                email: null
            })
        }).then(emp => {
            mongoose.disconnect()
            resolve(emp)
        }).catch(err => reject(err))
    })
}
exports.createManagerHR = (id, password, idOfManager , balance) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {}).then(emp => {
            let create = new User({
                ID: id,
                password: password,
                type: 'hr',
                email: null,
                name: null,
                birthDate: null,
                address: null,
                gender: null,
                phone: null,
                managerId: idOfManager,
                image: null,
                count : null,
                balance : balance
            })
            return create.save();
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}
exports.firstEditProfile = (ID, email, name, birthDate, address, gender, phone, image, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
                return bcrypt.hash(password, 10)
            }).then(hashPassword => {
                return User.findByIdAndUpdate(ID, {

                    email: email,
                    name: name,
                    birthDate: birthDate,
                    address: address,
                    gender: gender,
                    phone: phone,
                    image: image,
                    password: hashPassword,


                });
            })
            .then((user) => {
                mongoose.disconnect();
                resolve();

                //  returnNameAfterUpdate(user._id)
                //  console.log(user.ID +" "+user.name)
                //  authController.getNameAndIDAfterEdit(user.ID,user.name)

            })
            .catch((err) => {
                mongoose.disconnect();
                reject(err);
            });
    })
}

exports.returnNameAfterUpdate = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findById(id)
        }).then(user => {
            mongoose.disconnect()
            resolve([user.ID, user.name])
            // authController.getNameAndIDAfterEdit(user.ID,user.name)

        }).catch(err => reject(err))
    })
}

exports.getMyEmpHr = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.find({
                    email: {
                        $ne: null
                    },
                    type: 'employee'
                })
                .then(emp => {
                    mongoose.disconnect()
                    resolve(emp)
                }).catch(err => reject(err))
        })
    })
}

exports.deleteEmpHr = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findByIdAndDelete(id)
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
exports.updateAge = () => {

    mongoose.connect(DB_URL).then(() => {

        return User.find({}, {
            _id: false,
            birthDate: true
        }, (err, result) => {
            mongoose.disconnect()
        })

    }).then((birthDates) => {

        for (let i = 0; i < birthDates.length; i++) {
            mongoose.connect(DB_URL).then(() => {


                User.updateMany({
                    birthDate: birthDates[i].birthDate
                }, {
                    age: getAge(birthDates[i].birthDate)
                }, (err, result) => {
                    mongoose.disconnect()
                })


            })
        }
    })
}

exports.getMyEmpManager = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.find({
                    email: {
                        $ne: null
                    },
                    $or: [{
                        type: 'employee'
                    }, {
                        type: 'hr'
                    }]
                })
                .then(emp => {
                    // console.log(emp[0].birthDate)
                    //console.log(getAge(emp[0].birthDate))
                    //  for (let i=0;i<emp.length;i++){
                    //  User.updateOne({},{age : getAge(emp[i]["birthDate"])})
                    //  console.log(emp[i]["birthDate"])
                    // }
                    // console.log(element["birthDate"])
                    mongoose.disconnect()
                    resolve(emp)
                }).catch(err => reject(err))
        })
    })
}
exports.deleteEmpManager = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findByIdAndDelete(id)
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}
//edit profile
exports.editProfile = (ID, email, name, birthDate, address, gender, phone, image, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return bcrypt.hash(password, 10)
        }).then(hashPassword =>{
                return User.updateOne({ ID: ID }, {
                    $set: {
                        email : email,
                        name : name,
                        birthDate : birthDate,
                        address : address,
                        gender : gender,
                        phone : phone,
                        image : image,
                        password : hashPassword
                    }
                });
            }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

exports.geteditProfileInfo = (Id)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(()=>{
            return User.find({ID : Id})
            }).then(user => {  
                mongoose.disconnect()
                resolve(user)
            }).catch(err=>reject(err))
    })
}

exports.getNameById = (id)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(()=>{
            return User.find({ID : id},{name:true ,type :true , _id : false})  
        }).then(user => {  
            mongoose.disconnect()
            resolve([user[0].name,user[0].type])
        }).catch(err=>reject(err))
    })
}

exports.createManagerFromAdmin = (id, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {}).then(emp => {
            let create = new User({
                ID: id,
                password: password,
                type: 'manager',
                email: null,
                name: null,
                birthDate: null,
                address: null,
                gender: null,
                phone: null,
                image: null,
                count : null,
                balance : null
            })
            return create.save();
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}


exports.getAllUser = ()=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.find({})
        }).then((users) => {
            mongoose.disconnect()
            resolve(users)
        }).catch(err => reject(err))
    })
}
exports.deleteCreateManager = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findByIdAndDelete(id)
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => reject(err))
    })
}

exports.getManagerIdById = (id)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(()=>{
            return User.find({ID : id},{managerId : true , _id : false})  
        }).then(user => {  
            mongoose.disconnect()
            resolve(user[0].managerId)
        }).catch(err=>reject(err))
    })
}

exports.updateCount = (id,count)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
                return User.findByIdAndUpdate(id,
                    {
                        count : count ,
                        balance : count
                    });
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

exports.updateCountDecrease = (id)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
                return User.updateOne({ID : id}
                    ,{
                        $inc : {count : -1}
                    });
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

exports.updateCountIncrease = (id)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
                return User.updateOne({ID : id}
                    ,{
                        $inc : {count : +1}
                    });
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

exports.getManagerData = (id)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.find({ID : id})
        }).then(users => {
            mongoose.disconnect()
            resolve(users)
        }).catch(err => reject(err))
    })
} 

exports.getCountAndBalance = (id)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.find({ID : id} , {count : true , balance : true})
        }).then(userBalance => {
            mongoose.disconnect()
            resolve(userBalance[0])
        }).catch(err => reject(err))
    })
}

exports.getNumberOfEmployee = (id)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.find({managerId : id, email : {$ne : null}}).count(function(err,count){
                let countUser = count 
            })
        }).then(countUser => {
            mongoose.disconnect()
            resolve(countUser)
        }).catch(err => reject(err))
    })
}