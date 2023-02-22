const User = require('../model/userModel')
const bcrypt = require('bcrypt')

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

module.exports = {
    postUsers
}