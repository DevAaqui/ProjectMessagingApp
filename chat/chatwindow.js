

function sendFunction(){
    const token = localStorage.getItem('token')
    let chatbar = document.getElementById('chatbar')

    let chatObj = {
        chat: chatbar.value
    }

    axios.post('http://localhost:3000/chat/send', chatObj, { headers: {"Authorization" : token }})
    .then(response => {
        console.log(response)
    })

    chatbar.value=""
}

let intervalId=0
window.addEventListener('DOMContentLoaded',async (event) => {
    const token = localStorage.getItem('token')
    
     intervalId = setInterval(()=> {
        axios.get('http://localhost:3000/chat/chats', { headers: {"Authorization" : token}})
        .then(response=> {
            console.log(response.data.chatArray)
            let array = response.data.chatArray

            array.forEach(chat => {
            addNewine(chat) 
            });
        })
        // .then(()=> {
        //     clearInterval(intervalId)
        //})
        .catch(err => console.log(err))
    },1000) 
    
     
} )

function addNewine(obj){
    console.log(obj.chat)
    
    let li = `<li>You: ${obj.chat}</li>`
    //parentNode.appendChild(li)
    showOnScreen(li)
}

function showOnScreen(li){
    let chatlist = document.getElementById('chatlist')
    chatlist.innerHTML = chatlist.innerHTML + li
    //clearInterval(intervalId)
}