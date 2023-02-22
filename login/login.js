

function onSubmit() {
    //e.preventdefault()
    
    let loginEmail = document.getElementById('email')
    let loginPassword = document.getElementById('password')

    let loginObject = {
        email: loginEmail.value,
        password: loginPassword.value
    }

    axios.post('http://localhost:3000/user/login',loginObject)
    .then(response => {
        console.log(response.data.message)
        let msg = response.data.message
        if(msg === 'matched')
        {
            alert('Login Successfull')
        }
        else if(msg === 'User not exist'){
            alert('Password incorrect !!')
        }
        else{
            alert('User Not Exist')
        }
        
        localStorage.setItem('token', response.data.token) 
        
        
    })
    .catch(err=> console.log(err))
  
}