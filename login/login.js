

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
        console.log(response)
        
        //localStorage.setItem('token', response.data.token) //Baad me krenge
        
        
    })
    .catch(err=> console.log(err))
  
}