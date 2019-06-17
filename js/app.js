var users = [{email: "1@gmail.com" , password: 1}, {email: "2@gmail.com" , password: 2}, {email: "3@gmail.com" , password: 3}]

/* Users array has:
regular user at users[0]
employee user at users[1]
employee user at users[2]
*/

var loginEmail = document.getElementById('defaultLoginFormEmail').value; 
var loginPassword = document.getElementById('defaultLoginFormPassword').value;
var loginCredentials = {email: loginEmail, password: loginPassword}

var loginSubmit = document.getElementById('loginSubmit');

function validateLogin(){
    let loginEmail = document.getElementById('defaultLoginFormEmail').value; 
    let loginPassword = document.getElementById('defaultLoginFormPassword').value;
    let loginCredentials = {email: loginEmail, password: loginPassword}
    let validUser = false;
    let typeUser;
    let incrementer;

    for(var i = 0; i < users.length; i++){
        if(loginCredentials.email == users[i].email  && loginCredentials.password == users[i].password){
            validUser = true;
            incrementer = i;
            break;
        }
    }    
    if(validUser && incrementer != 0){
        window.open("employeewelcome.html");
    }else if(validUser && incrementer == 0){
        window.open("userwelcome.html");
    }else{
        alert("You've provided incorrect credentials. Please Try again")
    }
    
}

function setUserSession(){
    
}

loginSubmit.addEventListener("click", validateLogin)