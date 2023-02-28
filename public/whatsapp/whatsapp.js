var userID


window.addEventListener('DOMContentLoaded', async(event)=> {
    const token = localStorage.getItem('token')

    axios.get('http://100.25.196.230:3000/group/allgroup', {headers: {'Authorization': token}})
    .then(response=> {
        console.log(response.data)
        let array = response.data.allgroups
        console.log(array)
        array.forEach(groupObj => {
            addNewLine(groupObj)
        });
    })
})

function addNewLine(groupObj){
    let li =`<li class="block"><b>${groupObj.name}</b> <button type="button" id=${groupObj.id} onclick="showGroupMessages(${groupObj.id})">
    Show</button></li>`
    showOnGroup(li)
}

function showOnGroup(li){
    let groupList = document.getElementById('grouplist')
    groupList.innerHTML = groupList.innerHTML + li
}

//Function to show Group Messages
function showGroupMessages(groupId){
    const token = localStorage.getItem('token')
    
    console.log('Inside showgroupmessage fnction')
    localStorage.setItem('gid', groupId)
    axios.get(`http://100.25.196.230:3000/group/getchats/${groupId}`, {headers: {"Authorization" : token}})
    .then(response=> {
        console.log('response DAta>>>>',response.data)
        userID = response.data.idOfUser
        console.log('allchats>>>>>',response.data.allchats)
        let allChatsArray = response.data.allchats

        allChatsArray.forEach(chat => {
            addMessageLine(chat)            
        });
    })

}

function addMessageLine(chatObj){
    if(userID === chatObj.userId)
    {
        let li = `<li class="withId" style="list-style-type: none;">${chatObj.chat}</li>`
        showMessageLine(li)
    }
    else{
        let li = `<li style="list-style-type: none;">${chatObj.chat}</li>`
        showMessageLine(li)
    }
    
}

function showMessageLine(li){
    let groupMessageList = document.getElementById('groupMessageList')
    groupMessageList.innerHTML = groupMessageList.innerHTML + li
}

function sendMessageFunction(){
    const token = localStorage.getItem('token')
    let gid = localStorage.getItem('gid')
    console.log(gid)
    
    let chatbar = document.getElementById('chatbar')

    let chatObj = {
        chat: chatbar.value,
        groupId: gid
    }

    axios.post('http://100.25.196.230:3000/chat/send', chatObj, { headers: {"Authorization" : token }})
    .then(response => {
        console.log(response)
    })

    chatbar.value=""
}