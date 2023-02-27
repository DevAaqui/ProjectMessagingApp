window.addEventListener('DOMContentLoaded', (event)=> {
    const token = localStorage.getItem('token')
    
    

    axios.get('http://localhost:3000/admin/getadmingroups',{headers: {'Authorization': token}})
    .then(response => {
        let array = response.data.allgroups
        array.forEach(group => {
            addNewLine(group)
        });
    })
    
})

function addNewLine(groupObj){
    let li = `<li>${groupObj.name}--> 
    <button type="button" onclick="showGroupMembers(${groupObj.id})">Show Members</button>
    </li>`
    showOnScreen(li)
}

function showOnScreen(li){
    let grouplist= document.getElementById('grouplist')
    grouplist.innerHTML = grouplist.innerHTML + li
}

//----------------------------------------------------------------------------------------------
function showGroupMembers(groupId){
    const token = localStorage.getItem('token')

    axios.get(`http://localhost:3000/admin/groupmembers/${groupId}`, {headers: {'Authorization': token}})
    .then(response => {
        console.log(response.data.allMembers)
        let array = response.data.allMembers
        array.forEach(member => {
            addMemberLine(member)
        });
    })
}

function addMemberLine(memberObj){
    let li = `<li>${memberObj.name}--> 
    <button type="button" onclick="deleteMember(${memberObj.id},${memberObj.admin})">Delete user</button>
    </li>`
    showMemberOnScreen(li)
}

function showMemberOnScreen(li){
    let memberslist = document.getElementById('memberslist')
    memberslist.innerHTML = memberslist.innerHTML + li
}

function deleteMember(memberId, adminStatus){
    const token = localStorage.getItem('token')

    axios.delete(`http://localhost:3000/admin/deletemember/${memberId}`,{headers: {'Authorization': token}})
    .then(response=> {
        console.log(response.message)
    })
}