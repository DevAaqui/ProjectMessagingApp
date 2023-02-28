const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
var cors = require('cors')

const dotenv = require('dotenv')


const app = express()
dotenv.config({ path: './.env'});

const sequelize = require('./util/database')// It should be after dotenv.config
const User = require('./model/userModel')
const Message = require('./model/messageModel')
const Group = require('./model/groupModel')
const Member = require('./model/membersModel')
//const User_Group = require('./model/user_groupModel')

const userRoute = require('./routes/userRoute')
const messageRoute = require('./routes/chatRoutes')
const groupRoute = require('./routes/groupRoutes')
const adminRoute = require('./routes/adminRoutes')


app.use(bodyParser.json({extended: false}))



app.use(cors({
    origin: "*"
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use(userRoute)
app.use(messageRoute)
app.use(groupRoute)
app.use(adminRoute)

Group.belongsToMany(User, {through: 'User_Group'})
User.belongsToMany(Group,{through: 'User_Group'})


User.hasMany(Message)
Message.belongsTo(User)

Group.hasMany(Message)
Message.belongsTo(Group)

Group.hasMany(Member)
Member.belongsTo(Group)

sequelize//.sync({force: true})
.sync()
.then(result => {
    app.listen(process.env.PORT || 3000)
})
.catch(err=> console.log(err))


