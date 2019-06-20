var userDao = require("./DAO/UserDAO");
var accountDao = require("./DAO/AccountDAO");

module.exports = function(app){
    app.post('/api/login', (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        userDao.countUsersByEmail(email, function(err, rows){
            if(err) throw err;
            if(rows[0][0]["count(*)"] == 1){
                userDao.validateUser(password, email, function(err, rows){
                    if(err) throw err;
                    if(rows[0].length == 0){
                        return res.json({error: "Invalid Credentials"})
                    }
                    return res.json(rows[0][0])
                })
            }else{
                res.json({error:"Invalid Credentials"})
            }
        })

    })
    app.post('/api/register1', (req, res) => {
        let email = req.body.email
        let pass = req.body.password1
        let firstname = req.body.firstName
        let lastname = req.body.lastName
        userDao.countUsersByEmail(email, function(err, rows){
            if(err) throw err;
            if(rows[0][0]["count(*)"] == 1){
                return res.json({error: "Email has been taken!"})
            }else{
                userDao.registerUser1(pass, email, firstname, lastname, function(err, rows){
                    if(err) throw err;
                })
                userDao.getAllUserData(email, function(err, rows){
                    if(err) throw err;
                    return res.json(rows[0])
                })
                // return res.json({success: "user has been inserted"})
            }
        })
    })

    app.post('/api/register2', (req, res) => {
        let uid = req.body.uid
        let street = req.body.street;
        let city = req.body.city;
        let country = req.body.country;
        let zip = req.body.zip;
        userDao.registerUser2(uid, street, city, country, zip, function(err, rows){
            if(err) throw err;
            return res.json({success: "User record has been created"})
        })
        
    })

    app.get('/api/users/:userid/accounts',(req,res)=>{
        let uid = req.params.userid;
        
        console.log(uid)
        accountDao.accountsGrantedAccess(uid, function(err, rows){
            if(err) throw err;
            return res.json(rows[0])
        })
        
        
    })

    app.post('/api/accounts/:accountId/transaction',(req,res) => {
        let aid = req.params.accountId
        let action = req.body.action
        let amount = parseInt(req.body.amount)
        let currentBalance;
        let newBalance; 
        if(action == "Deposit"){
            accountDao.checkBalanceAccount(aid,function(err, rows){
                if(err) throw err;
                currentBalance = rows[0][0]["act_balance"];
                newBalance = currentBalance + amount;
                console.log("new balance: " + newBalance + " current balance: "+ currentBalance + " amount being added " + amount)
                accountDao.makeDepositTransaction(aid, newBalance, amount,function(err, rows){
                    if(err) throw err;
                })
                accountDao.updateBalanceAccount(aid, newBalance, function(err, rows){
                    if(err) throw err;
                    res.json({success: amount + "has been deposited to account: " + aid})
                })
            })
        }else if(action == "Withdraw"){
            let aid = req.params.accountId;
            let amount = parseInt(req.body.amount);
            let currentBalance;
            let newBalance; 
            accountDao.checkBalanceAccount(aid, function(err, rows){
                if(err) throw err;
                currentBalance = rows[0][0]["act_balance"]
                console.log(currentBalance);
                if(amount > currentBalance){
                    console.log("insuffient funds")
                    res.json({error: "You have insuffient funds to withdraw " + amount})
                }else{
                    newBalance = currentBalance - amount;
                    accountDao.makeWithdrawTransaction(aid, newBalance, amount, function(err, rows){
                        if(err) throw err;
                    })
                    accountDao.updateBalanceAccount(aid, newBalance, function(err, rows){
                        if(err) throw err;
                        res.json({success: amount + " has been withdrawn from account: " + aid});
                    })
                    
                }
            })
        }
    })

    app.post("/api/accounts/transfer", (req, res) => {
        
        let action = req.body.action;
        let currentBalance;
        let newBalance;
        let currentDestBalance;
        let newDestBalance;
        let amount = req.body.amount;
        let currentaid = req.body.currentAccountId;
        let destinedaid = req.body.destinedAccountId;
        if(action == "Transfer"){
            if(destinedaid == currentaid){
                res.json({error: "You can not transfer into your own account"})
            }else{
                accountDao.checkBalanceAccount(currentaid, function(err, rows){
                    if(err) throw err;
                    currentBalance = rows[0][0]["act_balance"]
                    if(amount <= currentBalance){
                        accountDao.confirmAccountExists(destinedaid, function(err, rows){
                            if(err) throw err;
                            if(rows[0][0]["count(*)"] == 1){
                                accountDao.confirmActiveAccount(destinedaid,function(err, rows){
                                    if(err) throw err;
                                    if(rows[0][0]["account_status"] == "Active"){
                                        newBalance = currentBalance - amount;
                                        accountDao.makeTransferTransaction(currentaid, newBalance, amount, destinedaid, function(err, rows){
                                            if(err) throw err;
                                        })
                                        accountDao.updateBalanceAccount(currentaid, newBalance, function(err, rows){
                                            if(err) throw err;
                                        })
                                        accountDao.checkBalanceAccount(destinedaid, function(err, rows){
                                            if(err) throw err;
                                            currentDestBalance = rows[0][0]["act_balance"];
                                            newDestBalance = currentDestBalance + amount;
                                            accountDao.updateBalanceAccount(destinedaid, newDestBalance,function(err, rows){
                                                if(err) throw err;
                                                res.json({success: "An amount of " + amount + " has been transferred from account " + currentaid + " to account " + destinedaid})
                                            })
                                        })
                                        
                                    }else{
                                        res.json({error: "The account you wish to transfer to is invalid"})
                                    }
                                })
                            }else{
                                res.json({error: "The account you wish to transfer to is invalid"})
                            }
                            
                        })
                    }else{
                        res.json({error: "You have insufficient funds to transfer"})
                    }
                })
            }
            
            
        }else{
            res.json({error: "The action you have performed is invalid"})
        }

    })
    app.get('/api/accounts/:accountId/transactions', (req, res) => {
        let aid = req.params.accountId
        
        accountDao.allTransactions(aid, function(err, rows){
            if(err) throw err;
            return res.json(rows)
        })
    })
    
    app.get('/api/allusers', (req, res) => {
        userDao.listAllUsers(function(err, rows){
            if(err) res.json(err);
            res.json(rows)
        })
    })



}