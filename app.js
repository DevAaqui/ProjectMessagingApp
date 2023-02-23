const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
var cors = require('cors')


const app = express()

const User = require('./model/userModel')
const Message = require('./model/messageModel')

const userRoute = require('./routes/userRoute')
const messageRoute = require('./routes/chatRoutes')

app.use(bodyParser.json({extended: false}))

const sequelize = require('./util/database')

app.use(cors({
    origin: "*"
}))

app.use(userRoute)
app.use(messageRoute)

User.hasMany(Message)
Message.belongsTo(User)

sequelize//.sync({force: true})
.sync()
.then(result => {
    app.listen(3000)
})
.catch(err=> console.log(err))


