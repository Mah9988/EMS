const router = require('express').Router()
const empController = require('../controllers/emp.controller')
const bodyParser = require('body-parser')
router.get('/',empController.getEmp)
router.post(
    '/',
    bodyParser.urlencoded({extended:true}),
    empController.postEMP
)
module.exports = router