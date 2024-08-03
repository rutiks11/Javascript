const mysql = require("mysql")

var mysqlConnection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'shraddha&saburi',
    database:'exam',
    port:3306
})


mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Established connection with the database")
    }
    else{
        console.log("Error in connection");
    }
})

module.exports=mysqlConnection;