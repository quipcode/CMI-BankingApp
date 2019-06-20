const db = require('../dbconnection');

var UserDao = {
    listAllUsers: function(callback){
        return db.query("select * from users", callback)
    },

    countUsersByEmail: function(email, callback){
        return db.query("call countUsersByEmail(?)", email, callback)
    },

    validateUser: function(email, password, callback){
        return db.query("call validateUser(?, ?)",[email, password], callback)
    },

    registerUser1: function(pass, email, firstname, lastname, callback ){
        return db.query("call registerUser1(?,?,?,?)", [pass, email, firstname, lastname], callback)
    },

    registerUser2: function(uid, street, city, country, zip, callback){
        return db.query("call registerUser2(?,?,?,?,?)",[uid,street, city, country, zip],callback)
    },

    getAllUserData: function(email, callback){
        return db.query("select * from users where email_address=?", email, callback)
    }
}

module.exports = UserDao;