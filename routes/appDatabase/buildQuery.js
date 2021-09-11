module.exports = function(sql, index, colName, res) {
/** 
* Brief description of the function here.
* @summary Dynamically builds SQL queries depending on a column name. Used for converting technique IDs into descriptions
* @param {string} sql - The first half of a SQL query, finishing at the 'WHERE' clause
* @param {number} index - An index to indicate which technique you are querying within the 'res' object
* @param {string} colName - The name of the filtering column in the SQL query, i.e. 'WHERE [colname] = ...'
* @param {object} res - An object containing the IDs to describe one ACT routine (i.e. techniqueIDs, frequencyID, durationID, adjunctID, adjunctTimeID)
* @return {string} A complete SQL query to retrieve the descriptions from the given IDs.
*/
    
    if ((typeof sql !== "string") || (typeof index !== "number") || 
    (typeof colName !== "string") || (typeof res !== "object") || 
    (arguments.length !== 4) || (index > res.length) ) {
        return false;
    }

    for (var i = 0; i < res[index].length; i++) {
        if (i == (res[index].length - 1)) {
            sql = sql.concat(colName + ' = ' + res[index][i][colName] + '; ');
        } else {
            sql = sql.concat(colName + ' = ' + res[index][i][colName] + ' OR ');
        }
    }
    return sql;
}