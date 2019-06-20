var server = "http://localhost:3000/api";


function sayingHi(){
    alert("form is submitting")
    console.log("saying Hi")
}


var registerFormStart = document.getElementById("registerForm1");
var registerSubmitBtn1 = document.getElementById("registerSubmitBtn1");


registerFormStart.addEventListener('click',function(e){
    e.preventDefault();
})

registerSubmitBtn1.addEventListener('click', registerUserPart1)




function registerUserPart1(){
    let defaultRegisterFormEmail = document.getElementById("defaultRegisterFormEmail").value
    let defaultRegisterFormPassword = document.getElementById("defaultRegisterFormPassword").value
    let defaultRegisterFormPasswordConfirm = document.getElementById("defaultRegisterFormPasswordConfirm").value
    let defaultRegisterFormFirstName = document.getElementById("defaultRegisterFormFirstName").value
    let defaultRegisterFormLastName = document.getElementById("defaultRegisterFormLastName").value
    // let defaultRegisterFormPhone = document.getElementById("defaultRegisterFormPhone").value
    let formData = {"email": defaultRegisterFormEmail, "password1": defaultRegisterFormPassword, "password2": defaultRegisterFormPasswordConfirm, "firstName": defaultRegisterFormFirstName, "lastName": defaultRegisterFormLastName}
    var url = server + "/register1"

    
    doPost(url, formData, function(res){
        if(res.error){
            alert(res.error)
        }else{
            console.log("response: ", res)
            // response:  {userid: 1, password: "1", user_type: "User", email_address: "niki1@gmail.com", first_name: "niki", …
            if(res.success){
                alert(res.success)
            }else {
                alert(res)
            }
            localStorage.setItem("FirstName", res.first_name)
            localStorage.setItem('UserId', res.userid)
            localStorage.setItem('Email', res.email_address)
            localStorage.setItem("UserType", res.user_type)
            window.location.href = "./userregister2_address.html"
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