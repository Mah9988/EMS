const express = require('express')

const  mongoose  = require('mongoose')
const path=require('path')
const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
//const { title } = require('process')
const app = express()
const empRouter = require('./routes/emp.route')
const authRouter = require('./routes/auth.route')
const adminTableRouter = require('./routes/adminTable.route')
const managerRouter = require('./routes/manager.route')
const HRRouter = require('./routes/HR.route')
const hrEmpRouter = require('./routes/hrEmp.route')
const editProfileRouter = require('./routes/Edit_profile.route')
const homeRouter = require('./routes/home.route')
const ourServicesRouter = require('./routes/ourServices.route')
const scheduleMeetingRouter = require('./routes/scheduleMeeting.route')
const aboutUsRouter = require('./routes/aboutUs.route')
const MyAttendanceEmpRouter = require('./routes/My_Attendance_EMP.route')
const myTaskEmpRouter = require('./routes/My_task_EMP.route')
const RequestleaveEmpRouter = require('./routes/Request_leave_EMP.route')
const addTaskHRRouter = require('./routes/Add_Task_HR.route')
const allRequestsleaveHRRouter = require('./routes/All_Requests_leave_HR.route')
const allTaskHRRouter = require('./routes/All_Task_HR.router')
const attendanceLogHRRouter = require('./routes/attendance_log_HR.route')
const MyRequestLeaveHRRouter = require('./routes/My_Request_Leave_HR.route')
const myTaskHRRouter = require('./routes/My_Task_HR.route')
const allRequestLeaveManagerRouter = require('./routes/All_Request_Leave_Manager.route')
const AllTaskManagerRouter = require('./routes/All_Task_Manager.route')
const attendanceLogManagerRouter = require('./routes/attendance_log_manager.route')
const EMPManagerRouter  =require('./routes/EMP_Manager.route')
const MyAttendanceHRRouter = require('./routes/My_Attendance_HR.route')
const AddTaskManagerRouter = require('./routes/Add_Task_Manager.route')
const myProfileRouter = require('./routes/My_Profile.route')


const { Cookie } = require('express-session')
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'files')))
const STORE = new SessionStore({
    uri : 'mongodb+srv://admin:admin123@cluster0.3wmdr.mongodb.net/EMS?retryWrites=true&w=majority',
    collection : 'sessions'
})
app.use(session({
  secret : 'my secret eeeennncrypt hashh function....',
  saveUninitialized : false,
  store : STORE
}))
app.use(flash())

app.get('/EMP_HR', (req, res) => {
    res.render('EMP_HR.ejs');
   });

app.set('view engine', 'ejs')
app.set('views','views') //deafault

app.use('/files', express.static('files'))
app.use('/',authRouter)
app.use('/employee',empRouter)
app.use('/',adminTableRouter)
app.use('/',managerRouter)
app.use('/',HRRouter)
app.use('/',hrEmpRouter)
app.use('/',editProfileRouter)
app.use('/',homeRouter)
app.use('/',ourServicesRouter)
app.use('/',scheduleMeetingRouter)
app.use('/',aboutUsRouter)
app.use('/',MyAttendanceEmpRouter)
app.use('/',myTaskEmpRouter)
app.use('/',RequestleaveEmpRouter)
app.use('/',addTaskHRRouter)
app.use('/',allRequestsleaveHRRouter)
app.use('/',allTaskHRRouter)
app.use('/',attendanceLogHRRouter)
app.use('/',MyRequestLeaveHRRouter)
app.use('/',myTaskHRRouter)
app.use('/',allRequestLeaveManagerRouter)
app.use('/',AllTaskManagerRouter)
app.use('/',attendanceLogManagerRouter)
app.use('/',EMPManagerRouter)
app.use('/',MyAttendanceHRRouter)
app.use('/',AddTaskManagerRouter)
app.use('/',myProfileRouter)
const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log('server listen on port 3000')

})