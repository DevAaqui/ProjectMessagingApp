const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const postUsers = async (req,res)=> {
    try{
        const {name,email,phonenumber,password} = req.body

        console.log('name,email,phonenumber,password>>>>>>>>', name,email,phonenumber,password)

        const userArray = await User.findAll()
        for(let i=0; i<userArray.length; i++)
        {
            if(userArray[i].email === email){
                return res.json({message: 'Existed'})
            }
        }
        
            bcrypt.hash(password,10,async(err,hash)=> {
                const data = await User.create({
                    name: name,
                    email: email,
                    phonenumber: phonenumber,
                    password: hash
                })
                if (data){
                    return res.status(200).json({message: 'User Created', data: data})
                }
            })
   
    }
    catch(err){
        console.log(err)
    }
    
}

function generateAccesstoken(id){
    return jwt.sign({userId : id},'dvElG2diDtMN4DQoyEMcCQ7HaAGEuEM4')
}

const loginUsers = async (req,res,next)=>{

    try{
        const {email, password} = req.body

        const loginUser = await User.findAll({where: {email}})

        console.log(loginUser)

        if(loginUser.length>0)
        {
            bcrypt.compare(password,loginUser[0].password, async(err, result)=> {
                if(err){
                    throw new Error('some error occured')
                }
                if(result === true){
                    return res.status(200).json({message: 'matched', success: true, token : generateAccesstoken(loginUser[0].id)})
                }
                else{
                    res.status(401).json({message: 'user not authorized', success: false})
                }
            })
        }
        else{
            return res.json({message: 'User not exist'})
        }
    }
    catch(err){
        console.log(err)
    }
    
}

module.exports = {
    postUsers, 
    loginUsers
}