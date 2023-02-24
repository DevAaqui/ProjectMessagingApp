const User = require('../model/userModel')
const Message = require('../model/messageModel')

const postChat = async (req, res, next)=> {
    try{
        const {chat} = req.body
        const userId = req.user.id
        const message = await Message.create({
            chat : chat,
            userId: userId
        })
        return res.json({chat:message, success: true})
    }
    catch(err){
        console.log(err)
    }
}

const getAllChats = async (req,res)=> {
    try{
        const userId = req.user.id

        const messageArray = await Message.findAll({where: {userId}})
        return res.status(200).json({chatArray:messageArray, success: true})
    }
    catch(err){
        console.log(err)
    }
    
}

const getNextChat = async (req,res)=> {
    try{
        const userId = req.user.id
        const chatId = req.params.chatId //||1

        let nextChatArray = []

        console.log('chatId>>>>>>>>>>>>>',chatId)
        let messageArray = await Message.findAll()
        for(let i=0; i<messageArray.length; i++){
            if(messageArray[i].id > chatId){
                console.log(messageArray[i].id)
                nextChatArray.push(messageArray[i])
            }
        }
        //console.log(nextChatArray)

        return res.json({chat:nextChatArray, success: true})
    }
    catch(err){
        console.log(err)
    }
}

module.exports= {
    postChat,
    getAllChats,
    getNextChat
}