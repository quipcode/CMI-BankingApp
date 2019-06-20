var server = "http://localhost:3000/api";

function sayingwhatup(){
    console.log("what up")
}


var myaccounts = JSON.parse(localStorage.getItem("AccountAccess"))
var listAccountsTable = document.getElementById("listAccountsTable");

for(var i = 0; i < myaccounts.length; i++){
    var join;
    (myaccounts[i].is_joint == 0) ? join = "No" : join = "Yes" 
    let row = listAccountsTable.insertRow(i)
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    let cell3 = row.insertCell(2)
    let cell4 = row.insertCell(3)
    let cell5 = row.insertCell(4)
    cell1.innerHTML = myaccounts[i].accountid
    cell2.innerHTML = myaccounts[i].account_type
    
    
    
    if(myaccounts[i].account_status == "Active"){
        cell3.textContent = "Active"
        cell3.setAttribute("class","p-3 mb-2 bg-success text-white" )
    }else if(myaccounts[i].account_status == "Deleted"){
        cell3.textContent = "Deleted"
        cell3.setAttribute("class","p-3 mb-2 bg-danger text-white")
    }else if( myaccounts[i].account_status == 'Pending Joint Approval'){
        cell3.textContent = "Pending Joint Approval"
        cell3.setAttribute("class","p-3 mb-2 bg-warning text-dark")
    }else if( myaccounts[i].account_status == 'Pending Deletion'){
        cell3.textContent = "Pending Deletion"
        cell3.setAttribute("class","p-3 mb-2 bg-warning text-dark")
    }else if(myaccounts[i].account_status == 'Pending Creation'){
        cell3.textContent = "Pending Creation"
        cell3.setAttribute("class","p-3 mb-2 bg-warning text-dark")
    }
    if(myaccounts[i].is_joint == 0){
        cell4.innerHTML = "No"
    }else{
        cell4.innerHTML = "Yes"
    }

    cell5.innerHTML = `<a  name = 'specificAccount' id='${myaccounts[i].accountid}'>View</a>`
    
}

var accountTally = document.getElementsByName("specificAccount");

accountTally.forEach(function(elem) {
    
    elem.addEventListener("click",listMyTransactions);
});


function listMyTransactions(){
    var url = server + "/accounts/" + this.id + "/transactions";
    localStorage.setItem("AccountId", this.id)
    var allTransactionForAccount 
    $.getJSON(url).then(function(res){
        allTransactionForAccount = JSON.stringify(res);
        localStorage.setItem("Transactions", allTransactionForAccount)
        
    })
    
    window.location.href = "./viewaccount.html"

}
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

