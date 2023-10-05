class User {
    constructor(userName, userEmail, userPassword){
        this.name = userName
        this.email = userEmail
        this.password = userPassword
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

// get DOM value
let userName = document.getElementById('userName')
let userEmail = document.getElementById('userEmail')
let userPassword = document.getElementById('userPassword')

let userNameEdit = document.getElementById('userNameEdit')
let userEmailEdit = document.getElementById('userEmailEdit')
let userPasswordEdit = document.getElementById('userPasswordEdit')
let saveUpdatesBtn = document.getElementById('saveUpdatesBtn')

let alertMsg = document.getElementById('alertMsg')
let listTable = document.getElementById('listTable')
let modal = document.getElementById('modal')


// API URL
const url = `https://basic-users.c4-na.altogic.com/user`

// API results
let apiResults

// GET users from API
function getAPIData(){
    fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    .then(response => response.json())
    .then(user => {
        apiResults = user.result
        showUsers()
    })
    .catch(error => console.log(error))
}
getAPIData()

// POST - Add new user on API
function postAPIData(){

    let newUser = new User(userName.value, userEmail.value, userPassword.value)

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(user => {
        console.log('New user has been added' + user)
    })
    .catch(error => console.log(error))
}

// PUT update - user on API
function updateAPIData(userId){
    let updatedUser = new User(userNameEdit.value, userEmailEdit.value, userPasswordEdit.value)
    //console.log(url + '/' + userId)

    fetch(url + '/' + userId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(user => {
        console.log('User has been updated' + user)
        window.location.reload()
    })
    .catch(error => console.log(error))
}

// DELETE - user from API
function deleteAPIData(userId){
    fetch(url + '/' + userId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status === 200) {
            console.log('User was successfuly deleted.')
            window.location.reload()
        } else {
            console.log('Error on deleting user.')
        }
    })
    .catch(error => console.log(error))
}

function showUsers(){
    if(apiResults.length > 0){
        for(let x in apiResults){
            //console.log(x)
            listTable.innerHTML += `
                <tr>
                    <td>${apiResults[x].name}</td>
                    <td>${apiResults[x].email}</td>
                    <td>${apiResults[x].password}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-sm me-3" onclick="updateUser('${apiResults[x]._id}')">update</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="deleteUser('${apiResults[x]._id}')">delete</button>
                    </td>
                </tr>
            `
        }
    }else{
        console.log('No results found.')
    }
}

function saveUsers(){
    let newUser = new User(userName.value, userEmail.value, userPassword.value)
    
    if(newUser.isValid()){
        // save new user on API
        postAPIData()

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

function updateUser(userId){
    // open modal
    openModal()

    // find id selected into the API
    for(let x in apiResults){
        if(userId === apiResults[x]._id){
            // Insert selected user info inside edit fields
            userNameEdit.value = apiResults[x].name
            userEmailEdit.value = apiResults[x].email
            userPasswordEdit.value = apiResults[x].password
            saveUpdatesBtn.innerHTML = `
                <button type="button" class="btn btn-primary w-100 py-2 mt-1" onclick="saveUserUpdates('${userId}')">Update</button>
            `
            return true // stop for loop when item has been matched
        }
    }
}

function saveUserUpdates(userId){
    updateAPIData(userId)
    closeModal()
}

function deleteUser(userId){
    //console.log(userId)
    deleteAPIData(userId)
}

function reset(){
    // clear form fields
    userName.value = ''
    userEmail.value = ''
    userPassword.value = ''
}

function openModal(){
    modal.classList.add('d-block')
    modal.classList.remove('d-none')
}

function closeModal(){
    modal.classList.add('d-none')
    modal.classList.remove('d-block')
}

