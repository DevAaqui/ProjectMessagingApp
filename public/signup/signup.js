let form = document.getElementById('signUpForm')

form.addEventListener('submit', onSubmit)

function onSubmit(e){
    e.preventDefault()

    let userName =document.getElementById('user')
    let userEmail = document.getElementById('email')
    let phone = document.getElementById('phonenumber')
    let userPassword = document.getElementById('password')

    let userObject = {
        name : userName.value,
        email : userEmail.value,
        phonenumber : phone.value,
        password : userPassword.value
    }

    axios.post('http://100.25.196.230:3000/user/signup', userObject)
    .then(response => {
        console.log(response)
        console.log(response.data)
        console.log(response.data.message)
        
        if(response.data.message === 'Existed'){
            alert('Email Already Existed!!')
        }
        else if(response.data.message === 'User Created')
        {
            alert('Successfully Signed Up')
        }
    })
    //.catch(err=> console.log(err))
}