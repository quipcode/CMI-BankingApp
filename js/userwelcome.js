var server = "http://localhost:3000/api";

var accountsIHaveAccessTo;
var userNameInsertionValue = localStorage.getItem("FirstName");
document.getElementById("UserNameSpan").innerHTML = userNameInsertionValue

function sayingwhatup(){
    console.log("what up")
}

var viewAccounts = document.getElementById("viewMyAccountsBtn");

viewAccounts.addEventListener("click", function(e){
    e.preventDefault();
    sayingwhatup();
    let uid = localStorage.getItem("UserId")
    listMyAccounts(uid)
})

function listMyAccounts(userId){
    console.log("List My Tasks");
    var url = server +"/users/"+ userId +"/accounts";
    console.log("right before get and userid is:" + userId)
    $.getJSON(url).then( function(res){
        accountsIHaveAccessTo = JSON.stringify(res);
        localStorage.setItem("AccountAccess", accountsIHaveAccessTo) 
        window.location.href = "./myaccounts.html"
        console.log(JSON.stringify(res));
    });
}