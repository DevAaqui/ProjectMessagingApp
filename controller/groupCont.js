const Group = require('../model/groupModel')
const User = require('../model/userModel')
const Message = require('../model/messageModel')
const Member = require('../model/membersModel')


const groupCreate = async (req,res,next)=> {
    try{
        let groupId
        const userId = req.user.id
        let {groupName,member,admin} = req.body //members with email to identify

        console.log('1st admin>>>>>>>>>',admin)

        if(admin==='Yes'){
            admin= true
        }
        else if(admin ==='No')
        {
            admin= false
        }

        const groupFind = await Group.findAll({where: {name: groupName}})
        
        if(groupFind[0] !== undefined && groupFind[0] !== null){
            console.log('groupfind>>>>>>>>>>',groupFind[0])
            //console.log('groupfind.id>>>>>>>>>>', groupFind[0].id)
            groupId = groupFind[0].id
        }
        else if(groupFind[0] === undefined || groupFind[0] === null){
            const groupCreat = await Group.create({
                name: groupName,
                created_by_id: userId
            })
            groupId = groupCreat.id
        }
        

        const mOne = await User.findAll({where:{email: member}})

        console.log(mOne[0])
        console.log('>>>>>>>>>>>>',groupId)
        console.log('2nd Admin>>>>>>>>>>>>>>>>>',admin)

        if(mOne[0] !==undefined){
            const newMember1 = await Member.create({
                name: mOne[0].name,
                admin: admin,
                userId: mOne[0].id,
                groupId: groupId
            }) 
            
            if(newMember1){
                return res.status(200).json({message: 'Member added to Group', success: true})
            }
            
        }
        else{
            res.status(400).json({success:false})
        }
        
        
    }
    catch(err){
        console.log(err)
    }
    

}

const getAllGroup = async (req,res)=> {
    var dbGroupArray = []
    const userId = req.user.id
    const memberInAllGroup = await Member.findAll({where: {userId: userId}})
    console.log('>>>>>>>>>>>>>>>',memberInAllGroup)

    for(const memberOfAGroup of memberInAllGroup){
        let dbGroupObj = await getGroupFunction(memberOfAGroup)
        dbGroupArray.push(dbGroupObj)
    }

    function getGroupFunction(memberOfAGroup){
        return new Promise(resolve => {
            let id = memberOfAGroup.groupId
            Group.findByPk(id)
            .then((obj)=> {
                resolve(obj)
            })
        })
        
    }

        console.log('dbGroupArray2>>>>>>', dbGroupArray)
        return res.status(200).json({allgroups:dbGroupArray, success: true})
    
}

// const getAllGroup = async (req,res)=> {
//     const userId = req.user.id
//     const allgroups = await Group.findAll({userId}) //different with where keyword(only single row returned)
//     if(allgroups)
//     {
//         return res.status(200).json({allgroups:allgroups, success: true})
//     }
// }

const getAllChats = async(req,res)=> {
    try{
        const userId = req.user.id
        const groupId = +req.params.groupId
        console.log(groupId)

        const allchats = await Message.findAll({where:{ groupId}})
        if(allchats){
            return res.status(200).json({allchats:allchats, idOfUser:userId, success:true})
        }
    }
    catch(err){
        console.log(err)
    }
    
}

module.exports = {
    groupCreate,
    getAllGroup,
    getAllChats
}