

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

}

window.addEventListener('DOMContentLoaded',(event) => {
    let chatlist = document.getElementById('chatlist')
    let li = `<li>You: Online</li>`

    showOnScreen(li)
} )

function showOnScreen(li){
    chatlist.innerHTML = chatlist.innerHTML + li
}