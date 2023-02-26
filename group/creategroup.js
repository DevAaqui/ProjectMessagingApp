let form = document.getElementById('groupform')

form.addEventListener('submit', createfunc)
function createfunc(e){

    e.preventDefault()

    let group = document.getElementById('groupname')
    let participant1 = document.getElementById('participant1')
    // let participant2 = document.getElementById('participant2')
    // let participant3 = document.getElementById('participant3')

    //console.log(group.value,participant1.value,participant2.value,participant3.value)

    let groupObj ={
        groupName: group.value,
        member: participant1.value
        // member2: participant2.value,
        // member3: participant3.value
    }
    const token = localStorage.getItem('token')

    axios.post('http://localhost:3000/group/create', groupObj, {headers: {'Authorization': token}})
    .then(response=> {
        console.log(response)
    })
}