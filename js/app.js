var server = "http://localhost:3000/api";



//Dom eventlistener on the login page button
var loginSubmit = document.getElementById('loginSubmitBtn');
var loginForm = document.getElementById("loginForm");
loginForm.addEventListener('click',function(e){
    e.preventDefault();
})

loginSubmit.addEventListener("click", logUserIn);

loginForm.addEventListener('click',function(e){
    e.preventDefault();
})


function listingAllUsers(){
    let url = server + "/allusers";
    $.getJSON(url).then(function(res){
        console.log(JSON.stringify(res))
    })
}


function logUserIn(){
    let url = server + "/login";
    let email = document.getElementById("defaultLoginFormEmail").value; 
    let password = document.getElementById("defaultLoginFormPassword").value;
    let formData = {"email": email, "password": password};
    doPost(url, formData, function(res){
        if(res.error){
            alert(res.error)
        }else if(res.user_type == "User"){
            localStorage.setItem("FirstName", res.first_name)
            localStorage.setItem('UserId', res.userid)
            localStorage.setItem('Email', res.email_address)
            localStorage.setItem("UserType", res.user_type)
            window.location.href = "./userwelcome.html"
        }else if(res.user.type == "Employee"){
            localStorage.setItem("FirstName", res.first_name)
            localStorage.setItem('UserId', res.userid)
            localStorage.setItem('Email', res.email_address)
            localStorage.setItem("UserType", res.user_type)
            window.location.href = "./employeewelcome.html"
        }else if(res.user.type == "Admin"){
            localStorage.setItem("FirstName", res.first_name)
            localStorage.setItem('UserId', res.userid)
            localStorage.setItem('Email', res.email_address)
            localStorage.setItem("UserType", res.user_type)
            window.location.href = "./adminwelcome.html"
        }
    })
}

function doPost(url,data,callback){
    $.ajax ({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: callback
    });
}