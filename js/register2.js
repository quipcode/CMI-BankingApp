var server = "http://localhost:3000/api";


function sayingHi(){
    console.log("saying Hi")
}




var registerForm2 = document.getElementById("registerForm2");
var registerSubmitBtn2 = document.getElementById("registerSubmitBtn2");

registerForm2.addEventListener('click',function(e){
    e.preventDefault();
})




registerSubmitBtn2.addEventListener('click', registerUserPart2)




function registerUserPart2(){
    let uid = localStorage.getItem("UserId");
    let defaultLoginFormAddressStreet = document.getElementById("defaultLoginFormAddressStreet").value;
    let defaultLoginFormAddressCity = document.getElementById("defaultLoginFormAddressCity").value;
    let defaultLoginFormAddressCountry = document.getElementById("defaultLoginFormAddressCountry").value;
    let defaultLoginFormAddressZip = document.getElementById("defaultLoginFormAddressZip").value;

    let formData = {"uid": uid, "street": defaultLoginFormAddressStreet, "city": defaultLoginFormAddressCity, "country": defaultLoginFormAddressCountry, "zip": defaultLoginFormAddressZip}
    var url = server + "/register2"

    
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

            
            window.location.href = "./userwelcome.html"
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