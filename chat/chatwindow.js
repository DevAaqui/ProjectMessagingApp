

function sendFunction(){

}

window.addEventListener('DOMContentLoaded',(event) => {
    let chatlist = document.getElementById('chatlist')
    let li = `<li>You: Online</li>`

    showOnScreen(li)
} )

function showOnScreen(li){
    chatlist.innerHTML = chatlist.innerHTML + li
}