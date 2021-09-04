const generateUniqueId = require('generate-unique-id');
const date = require('date-and-time')
const generatePassword = require('generate-password');
const authModel = require('../models/auth.model')

let id3,name
exports.getIdAndName = (id1,name1)=>{
    id3 = id1
    name = name1
}

exports.getEMPManager = (req, res, next) => {
    authModel.getCreateManagerEmp().then((emps) => {
        authModel.getMyEmpManager().then((myEmps)=>{
            authModel.getManagerData(id3).then((users)=>{
                res.render('EMP_Manager', {
                    emp: emps,
                    myEmp:myEmps,
                    idManager : id3,
                    nameManager : name,
                    user : users
                })
            })
        })
    }).catch(err => console.log(err))
}


exports.postCreateEmp = (req, res, next) => {
    //  console.log(req.body.create)
    if (req.body.CreateEmpBtn) {
        const now = new Date();
        var id = date.format(now, 'YYYY').substring(1) + generateUniqueId({
            length: 5,
            useLetters: false
        });
        var password = generatePassword.generate({
            length: 6,
            numbers: true,
            uppercase: false
        });
        
        authModel.createManagerEmp(id, password, req.body.CreateEmpBtn).then(() => {
            authModel.updateCountDecrease(id3).then(()=>{
                res.redirect('/manager/EMP_Manager')
            })
        }).catch(err => {
            console.log(err)
        })

    }
    if(req.body.CreateHRBtn){
        const now = new Date();
        var id = date.format(now, 'YYYY').substring(1) + generateUniqueId({
            length: 5,
            useLetters: false
        });
        var password = generatePassword.generate({
            length: 6,
            numbers: true,
            uppercase: false
        });
        authModel.createManagerHR(id, password, req.body.CreateHRBtn).then(() => {
            authModel.updateCountDecrease(id3).then(()=>{
            res.redirect('/manager/EMP_Manager')
        }).catch(err => {
            console.log(err)
        })
    })
    }
    if (req.body.deleteManagerBtn) {
        authModel.deleteCreateEmpHr(req.body.deleteManagerBtn).then(() => {
            authModel.updateCountIncrease(id3).then(()=>{
                res.redirect("/manager/EMP_Manager")
            })
        }).catch(err => {
            console.log(err)
        })
    }

    if(req.body.sureDeleteBtn)
    {
        authModel.deleteEmpManager(req.body.sureDeleteBtn).then(()=>{
            res.redirect("/manager/EMP_Manager")
        }).catch(err =>{
            console.log(err)
        }) 
    }
}
