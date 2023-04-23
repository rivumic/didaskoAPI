const loginButton = document.querySelector('#loginButton')
const passwordField =  document.querySelector('#passwordField')
const usernameField =  document.querySelector('#usernameField')
const error = document.querySelector('#errorMessage')

loginButton.addEventListener(click, (button)=>{
    button.disable()
    if (passwordField.value && usernameField.value){
        axios.post('/login',{username: usernameField.value, password: passwordField.value}).then((response)=>{
            if(response)error.innerHTML='login information was incorrect'
            button.enable()
        }).catch((err)=>{
            console.log(err)
            button.enable()
        })
    }
})