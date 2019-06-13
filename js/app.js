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

    for(var i = 0; i < users.length; i++){
        if(loginCredentials.email == users[i].email  && loginCredentials.password == users[i].password){
            (i == 0)
            validUser = true;
            break;
        }
    }    
    if(validUser && i != 0){
        window.open("employeewelcome.html");
    }else if(validUser && i == 0){
        window.open("employeewelcome.html");
    }else{
        alert("You've provided incorrect credentials. Please Try again")
    }
    
}

loginSubmit.addEventListener("click", validateLogin)