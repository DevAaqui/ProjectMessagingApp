const User = require('../model/userModel')
const bcrypt = require('bcrypt')

const postUsers = async (req,res)=> {
    try{
        const {name,email,phonenumber,password} = req.body

        console.log('name,email,phonenumber,password>>>>>>>>', name,email,phonenumber,password)

        const existedUser = User.findAll({email:email})
        if(existedUser){
            return res.status(403).json({message: 'Existed'})
        }
        else{
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
    }
    catch(err){
        console.log(err)
    }
    
}

module.exports = {
    postUsers
}