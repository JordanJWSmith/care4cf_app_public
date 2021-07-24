var mysql = require('mysql');

var conn = mysql.createPool({
    host: 'care4cf-db.mysql.database.azure.com',
    user: 'ucabjjw@care4cf-db',
    password: 'Jordan2016Smith',
    database: 'care4cf_private',
    port: 3306,
    ssl: true
}); 

// conn.readData = function readData(query){
//     conn.query(query, 
//         function (err, results, fields) {
//             if (err) throw err;
//             else console.log('Selected ' + results.length + ' row(s).');
//             for (i = 0; i < results.length; i++) {
//                 console.log('Row: ' + JSON.stringify(results[i]));
//             }
//             console.log('Done.');
//             return results;
//         })
//     conn.end(
//         function (err) { 
//             if (err) throw err;
//             else  console.log('Closing connection.') 
//     });
// };

// conn.connect(function(err) {
//   if (err) throw err;
//   console.log('Database is connected successfully !');
// });

module.exports = conn;