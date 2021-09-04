const generateUniqueId = require('generate-unique-id');
const date =require('date-and-time')
const generatePassword = require('generate-password');
const hrEmpModel = require('../models/hrEmp.model')
const authModel = require('../models/auth.model')

let id,name
exports.getIdAndName = (id1,name1)=>{
    id = id1
    name = name1
}

exports.gethrEmp = (req,res,next)=>{
    
    authModel.getCreateEmpHr().then(emps=>{    
    authModel.getMyEmpHr().then(myEmps=>{
        authModel.getManagerIdById(id).then((managerId)=>{
            authModel.getCountAndBalance(managerId).then((userBalance)=>{
                res.render('hrEmp',{
                    emp:emps,
                    myEmp:myEmps,
                    idHR : id,
                    nameHR : name,
                    countHR : userBalance.count,
                    balanceHR : userBalance.balance
                })
            })
            
        })
        })
        
    })
}

exports.posthrEmp = (req, res, next) => {
  //  console.log(req.body.create)
    if(req.body.create){
        
        const now = new Date();
        var id =date.format(now, 'YYYY').substring(1)+ generateUniqueId({
            length: 5,
            useLetters: false
            
          });
          var password = generatePassword.generate({
            length: 6,
            numbers: true,
            uppercase:false
            
        });  
        authModel.getManagerIdById(req.body.create).then((user)=>{
            authModel.createEmpHr(id,password,user).then(()=>{
                authModel.updateCountDecrease(user).then(()=>{
                    res.redirect('/HR/emp')
                })
            }).catch(err=>{
                console.log(err)
            })
        })
        
    }
    if(req.body.deleteEmpBtn){
        let splitBtn = (req.body.deleteEmpBtn).split(',')
        authModel.getManagerIdById(splitBtn[1]).then((user)=>{
            authModel.updateCountIncrease(user).then(()=>{
        authModel.deleteCreateEmpHr(splitBtn[0]).then(()=>{
                    res.redirect("/HR/emp")
                })
            })
        }).catch(err =>{console.log(err)})
    }

    if(req.body.sureDeleteBtn)
    {
        authModel.deleteCreateEmpHr(req.body.sureDeleteBtn).then(()=>{
            res.redirect("/HR/emp")
        }).catch(err =>{
            console.log(err)
        })  
    }
    }
