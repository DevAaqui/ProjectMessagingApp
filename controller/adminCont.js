const User = require('../model/userModel')
const Message = require('../model/messageModel')
const Member = require('../model/membersModel')
const Group = require('../model/groupModel')

const getAdminGroups = async (req,res)=> {
    const userId = req.user.id
    let dbGroupArray=[]
    try{
        const memberBeingAdmin = await Member.findAll({
            where: {
                admin : true,
                userId: userId
            }
        })
        // We should use for loop for every admin having groups
        console.log('1>>>>>>>>>>>', memberBeingAdmin.groupId)


        for(const memberAdmin of memberBeingAdmin){
            let dbGroupObj = await getGroupFunction(memberAdmin)
            dbGroupArray.push(dbGroupObj)
        }

        function getGroupFunction(memberAdmin){
            return new Promise(resolve => {
                let id = memberAdmin.groupId
                Group.findByPk(id)
                .then((obj)=> {
                resolve(obj)
                })
            })
                    
        }

        console.log('dbGroupArray2>>>>>>', dbGroupArray)
        if(dbGroupArray.length >0){
            return res.status(200).json({allgroups:dbGroupArray, success: true})
        }
        


        // if(memberBeingAdmin.length > 0)
        // {
        //     console.log('2>>>>>>>>>>>', memberBeingAdmin[0].groupId)
        //     const groups = await Group.findAll({
        //         where:{
        //             id : memberBeingAdmin[0].groupId
        //         }
        //     })
        //     if(groups.length >0)
        //     {
        //         return res.status(200).json({allgroups:groups, success: true})
        //     }
        // }
    }
    catch(err){
        console.log(err)
    }
    //-----------------------------------------------------------
//     var dbGroupArray = []
//     const userId = req.user.id
//     const memberInAllGroup = await Member.findAll({where: {userId: userId}})
//     console.log('>>>>>>>>>>>>>>>',memberInAllGroup)

//     for(const memberOfAGroup of memberInAllGroup){
//         let dbGroupObj = await getGroupFunction(memberOfAGroup)
//         dbGroupArray.push(dbGroupObj)
//     }

//     function getGroupFunction(memberOfAGroup){
//         return new Promise(resolve => {
//             let id = memberOfAGroup.groupId
//             Group.findByPk(id)
//             .then((obj)=> {
//                 resolve(obj)
//             })
//         })
        
//     }

//         console.log('dbGroupArray2>>>>>>', dbGroupArray)
//         return res.status(200).json({allgroups:dbGroupArray, success: true})
 
// }
}

const getMembers = async (req,res)=> {
    const userId = req.user.id
    const {groupId} = req.params

    const membersArray = await Member.findAll({
        where: {
            groupId: groupId
        }
    })
    if(membersArray.length >0)
    {
        return res.status(200).json({allMembers:membersArray, success: true})
    }
}

const deleteMember = async (req,res)=> {
    const userId= req.user.id
    const {memberId} = req.params

    console.log(memberId)

    const memberDel = await Member.findAll({
        where: {
            id: memberId
        }
    })
    console.log('memberDel>>>>>>>>>>>>',memberDel)
    if(memberDel[0].admin === false){
        await memberDel[0].destroy()
        return res.json({message: 'DELETED', success: true})
    }
    else{
        return res.status(404).json({message: "ADMIN"})
    }
}

module.exports = {
    getAdminGroups,
    getMembers,
    deleteMember
}