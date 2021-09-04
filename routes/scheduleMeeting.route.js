const router = require('express').Router();
const bodyParser = require('body-parser');
const scheduleMeeting = require('../controllers/scheduleMeeting.controller');
const check = require('express-validator').check
const { route } = require('./emp.route');
router.get('/home/scheduleMeeting' , scheduleMeeting.getscheduleMeetiing);

router.post(
    '/home/scheduleMeeting',
    bodyParser.urlencoded({extended:true}),
    check('Email').not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('').withMessage('Invalid Format must be EMAIL'),
    scheduleMeeting.postScheduleMeetings
)
module.exports = router