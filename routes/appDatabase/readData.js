var db = require('./database');

module.exports = function (query, data){
    return new Promise( ( resolve, reject ) => {
        db.query( query, data, ( err, rows ) => {
            if ( err )
                return reject( err );
            // console.log('rows: ', rows);
            resolve( rows );
        } );
    } );
   
};