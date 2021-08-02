var mysql = require('mysql');

var conn = mysql.createPool({
    host: 'care4cf-db.mysql.database.azure.com',
    user: 'ucabjjw@care4cf-db',
    password: 'Jordan2016Smith',
    database: 'care4cf',
    port: 3306,
    ssl: true,
    multipleStatements: true
}); 


module.exports = conn;