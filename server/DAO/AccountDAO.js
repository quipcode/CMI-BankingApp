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
    
    makeWithdrawAccount: function(){},

    makeDepositTransaction: function(accountId, newTransBal, depositAmount, callback){
        return db.query("call depositTrans(?,?,?)", [accountId, newTransBal,depositAmount],callback)
    }

}

module.exports = AccountDAO;