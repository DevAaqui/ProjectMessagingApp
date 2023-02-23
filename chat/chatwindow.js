

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

window.addEventListener('DOMContentLoaded',(event) => {
    const token = localStorage.getItem('token')
    

    axios.get('http://localhost:3000/chat/chats', { headers: {"Authorization" : token}})
    .then(response=> {
        console.log(response.data.chatArray)
        let array = response.data.chatArray

        array.forEach(chat => {
           addNewine(chat) 
        });
    })
    .catch(err => console.log(err))

    

    
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
}