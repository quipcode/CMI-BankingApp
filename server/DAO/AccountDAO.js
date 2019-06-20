const db = require('../dbconnection');

var AccountDAO = {
    validateAccountAccess: function(uid, callback){
        return db.query("select accountid from account_access where userid = ?", uid, callback)
    },

    accountsGrantedAccess: function(uid, callback){
        // return db.query("select * from accounts")
        return db.query("call accountsGrantedAccess(?)",uid, callback)
        
    },

    allTransactions: function(accountId, callback){
        return db.query("select * from transaction where account_id = ?", accountId, callback)
    },

    checkBalanceAccount: function(accountId, callback){
        return db.query("call getBalanceAccount(?)", accountId, callback)
    },

    updateBalanceAccount: function(accountId, newBalance,callback){
        return db.query("call updateBalanceAccount(?,?)", [accountId, newBalance], callback)
    },

    confirmAccountExists: function(accountId, callback){
        return db.query("call confirmAccountExists(?)", accountId, callback);
    },

    confirmActiveAccount: function(accountId, callback){
        return db.query("call confirmActiveAccount(?)", accountId, callback)
    },
    
    makeWithdrawTransaction: function(accountId, newTransBal, withdrawAmount, callback){
        return db.query("call withdrawTrans(?,?,?)", [accountId, newTransBal, withdrawAmount], callback);
    },

    makeDepositTransaction: function(accountId, newTransBal, depositAmount, callback){
        return db.query("call depositTrans(?,?,?)", [accountId, newTransBal,depositAmount],callback);
    },

    makeTransferTransaction: function(accountId, bal, transferAmount, transferaid, callback){
        return db.query("call transferTrans(?,?,?,?)",[accountId, bal, transferAmount, transferaid], callback);
    }

}

module.exports = AccountDAO;