const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check
const Edit_profile = require('../controllers/Edit_profile.controller')


router.get('/editProfile',Edit_profile.getEditProfile)

router.post(
    '/editProfile',
    bodyParser.urlencoded({extended:true}),
    check('name').not().isEmpty().withMessage('The name must consist of 4 syllables'),
    check('PhoneNumber').not().isEmpty().withMessage('Phone-Number is required'),
    check('email').not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('').withMessage('Invalid Format must be EMAIL'),
    check('password').trim().notEmpty().withMessage('Password required')
    .isLength({ min: 5 }).withMessage('password must be minimum 5 length')
    .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
    .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
    .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
    .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
    .not().matches(/^$|\s+/).withMessage('White space not allowed'),
    Edit_profile.postEditProfile
)
module.exports = router