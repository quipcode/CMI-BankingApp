const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cmi_bank"
})

con.connect(function(err){
    if(err) throw err;
    console.log("Connected to DB: cmi_bank")
})

module.exports = con;