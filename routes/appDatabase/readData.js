var db = require('./database');

module.exports = function (query, data){
/** 
* Brief description of the function here.
* @summary Perform a query on the database
* @param {string} query - A SQL query with variable values escaped with question marks
* @param {array} data - An array of values to insert into the query
* @return {object} An object containing results from the query
*/
    
    return new Promise( ( resolve, reject ) => {
        db.query( query, data, ( err, rows ) => {
            // console.log(query);
            if ( err )
                return reject( err );
            // console.log('rows: ', rows);
            resolve( rows );
        } );
       
    } );
   
};