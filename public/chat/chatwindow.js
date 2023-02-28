

function createGroupfunction(){
    window.location.href = "../group/creategroup.html"
}

function sendFunction(){
    const token = localStorage.getItem('token')
    let chatbar = document.getElementById('chatbar')

    let chatObj = {
        chat: chatbar.value
    }

    axios.post('http://100.25.196.230:3000/chat/send', chatObj, { headers: {"Authorization" : token }})
    .then(response => {
        console.log(response)
    })

    chatbar.value=""
}

let intervalId=0
//let localStorageArray = []
window.addEventListener('DOMContentLoaded',async (event) => {
    const token = localStorage.getItem('token')
    let lastKey

    for(let i=0; i<localStorage.length; i++)
    {
        let key = localStorage.key(i)
        addNewLine(key)

        lastKey = key
        
    }
    //console.log(lastKey)

    axios.get(`http://100.25.196.230:3000/chat/nextchat/${lastKey}`, {headers: {"Authorization" : token}})
    .then(response => {
        console.log(response.data)
        //console.log(response.data.chat)
        let backendChatArray = response.data.chat
        backendChatArray.forEach(chat => {
            localStorage.setItem(`${chat.id}`, `${chat.chat}`)
        });
        // for(let i=0; i<backendChatArray.length; i++){
        //     console.log(backendChatArray[i].id, backendChatArray[i].chat)
        //     localStorage.setItem(`${backendChatArray[i].id}`,`${backendChatArray[i].chat}`)
        //     addNewLine(`${backendChatArray[i].id}`)
        // }
    })
    
    
    //-------------------------------------------------------------------------------------------------
    //  intervalId = setInterval(()=> {
    //     axios.get('http://100.25.196.230:3000/chat/chats', { headers: {"Authorization" : token}})
    //     .then(response=> {
    //         console.log(response.data.chatArray)
    //         let array = response.data.chatArray

    //         array.forEach(chat => {

    //             localStorage.setItem(`${chat.id}`, `${chat.chat}`)
                

    //             addNewine(chat) 
    //         });
    //     })
    //     .then(()=> {
    //         clearInterval(intervalId)
    //         console.log(localStorageArray)
    //     })
    //     .catch(err => console.log(err))
    // },1000) 
    
     
} )

function addNewLine(key){
    if(key !== 'token')
    {
        console.log(key)
        console.log(localStorage.getItem(key))
        
        let li = `<li>You: ${localStorage.getItem(key)}</li>`
        //parentNode.appendChild(li)
        showOnScreen(li)
    }
    
}

// function addNewine(obj){
//     console.log(obj.chat)
    
//     let li = `<li>You: ${obj.chat}</li>`
//     //parentNode.appendChild(li)
//     showOnScreen(li)
// }

function showOnScreen(li){
    let chatlist = document.getElementById('chatlist')
    chatlist.innerHTML = chatlist.innerHTML + li
    //clearInterval(intervalId)
}