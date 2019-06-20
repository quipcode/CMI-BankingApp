var server = "http://localhost:3000/api";

// console.log(localStorage.getItem("AccountAccess"))
var myTrans = JSON.parse(localStorage.getItem("Transactions"));
var listTransBody = document.getElementById("listingTransactionsBody");

var transForm = document.getElementById("transactionForm")
var transAction = document.getElementById("transButton")
var selectedTrans = document.getElementById("transactionSelection")
var amount = document.getElementById("amount")

var transferFrom = document.getElementById("transferForm");
var transferButton = document.getElementById("transferButton");
var transferDest = document.getElementById("transferDestination");
var transferAmount = document.getElementById("transferAmount");




for(var i = 0; i < myTrans.length; i++){
    let row = listTransBody.insertRow(i);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    
    cell1.innerHTML = myTrans[i].account_id;
    cell3.innerHTML = myTrans[i].description;
    cell2.innerHTML = myTrans[i].date
    if(myTrans[i].description == "Withdraw"){
        cell4.innerHTML = myTrans[i].withdraw
    }else if(myTrans[i].description == "Deposit"){
        cell4.innerHTML = myTrans[i].deposit
    }else if(myTrans[i].description == "Transfer"){
        cell4.innerHTML = myTrans[i]["transfer_amount"]
    }
    cell5.innerHTML = myTrans[i].account_bal;
}


transForm.addEventListener('click', function(e){
    e.preventDefault();
})

transAction.addEventListener("click",sendingTrans )

function sendingTrans(){
    let formData = {"action": selectedTrans.options[selectedTrans.selectedIndex].value, "amount": amount.value, "AccountId": localStorage.getItem("AccountId")}
    let url = server + "/accounts/" + localStorage.getItem("AccountId") + "/transaction";
    doPost(url, formData, function(res){
        if(res.error){
            alert(res.error)
        }else if(res.success){
            alert(res.success)
            listMyTransactions()
        }
    })
}


transferButton.addEventListener("click", sendingTransfer);

transferFrom.addEventListener("click", function(e){
    e.preventDefault();
})

function sendingTransfer(){
    let formData = {"action": "Transfer", "amount": parseInt(transferAmount.value), currentAccountId: localStorage.getItem("AccountId"), destinedAccountId: transferDest.value}
    let url = server + "/accounts/transfer";
    doPost(url, formData, function(res){
        if(res.error){
            alert(res.error);
        }else if(res.success){
            alert(res.success);
            listMyTransactions();
        }
    })
     
}

function listMyTransactions(){
    let url = server + "/accounts/" + localStorage.getItem("AccountId") + "/transactions";
    var allTransactionForAccount;
    $.getJSON(url).then(function(res){
        allTransactionForAccount = JSON.stringify(res);
        localStorage.setItem("Transactions", allTransactionForAccount)
    })
    window.location.href = "./viewaccount.html"
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