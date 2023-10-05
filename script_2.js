class User {
    constructor(userName, userEmail, userPassword){
        this.userName = userName
        this.userEmail = userEmail
        this.userPassword = userPassword
    }
    isValid(){
        if(userName.value == undefined || userName.value == '' || userName.value == null){
            userName.classList.add('is-invalid')
            return false
        }
        if(userEmail.value == undefined || userEmail.value == '' || userEmail.value == null){
            userEmail.classList.add('is-invalid')
            return false
        }
        if(userPassword.value == undefined || userPassword.value == '' || userPassword.value == null){
            userPassword.classList.add('is-invalid')
            return false
        }else{
            userName.classList.remove('is-invalid')
            userEmail.classList.remove('is-invalid')
            userPassword.classList.remove('is-invalid')
            return true
        }
    }
}

// class Db {
//     constructor(){

//     }
//     saveUser(data){
//         //console.log(`user ${data} has been saved`)
//         localStorage.setItem('users', JSON.stringify(data))
//     }
//     editUser(){
//         console.log('edit user info')
//     }
//     deleteUser(){
//         console.log('delete user info')
//     }
// }
// let db = new Db()

// get DOM value
let userName = document.getElementById('userName')
let userEmail = document.getElementById('userEmail')
let userPassword = document.getElementById('userPassword')
let alertMsg = document.getElementById('alertMsg')
let listTable = document.getElementById('listTable')


// Arrays List
//let apiResults = []

function getAPIData(){
    const url = `https://basic-users.c4-na.altogic.com/user`
    
    return fetch(url)
    .then(response => response.json())
    .then(response => {
        let apiResults = response.result
        showUsers(apiResults)
        //return apiResults
    })
    .catch(error => console.log(error))
}
getAPIData()

function showUsers(apiResults){
    if(apiResults.length > 0){
        for(let x in apiResults){
            console.log(x)
            listTable.innerHTML += `
                <tr>
                    <td>${apiResults[x].name}</td>
                    <td>${apiResults[x].email}</td>
                    <td>${apiResults[x].password}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-sm me-3">update</button>
                        <button type="button" class="btn btn-danger btn-sm">delete</button>
                    </td>
                </tr>
            `
        }
    }else{
        console.log('No results found.')
    }
}

function saveUser(){
    let newUser = new User(userName.value, userEmail.value, userPassword.value)
    console.log(newUser)
}


// save User on API
function saveUsers(){
    let newUser = new User(userName.value, userEmail.value, userPassword.value)

    console.log('entrou')

    if(newUser.isValid()){
        listUsers.push(newUser)
        db.saveUser(listUsers)

        // clear form fields
        reset()

        // success message
        alertMsg.innerHTML = 'Your account has been created!'
        alertMsg.className = 'alert alert-success'

        // hide validation message after 2secs
        setTimeout(function(){ 
            alertMsg.innerHTML = ''
            alertMsg.className = ''
        }, 2000)
        
    }else{
        // error message
        alertMsg.innerHTML = 'Please fill the correct information.'
        alertMsg.className = 'alert alert-danger'

        // hide validation message after 2secs
        setTimeout(function(){ 
            alertMsg.innerHTML = ''
            alertMsg.className = ''
        }, 2000)
    }
}

function reset(){
    // clear form fields
    userName.value = ''
    userEmail.value = ''
    userPassword.value = ''
}

