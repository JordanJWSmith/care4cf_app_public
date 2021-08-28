module.exports = function(sql, index, colName, res) {
    if ((typeof sql !== "string") || (typeof index !== "number") || 
    (typeof colName !== "string") || (typeof res !== "object") || 
    (arguments.length !== 4) || (index > res.length) ) {
        console.log('incorrect arguments');
        return false;
    }

    for (var i = 0; i < res[index].length; i++) {
        if (i == (res[index].length - 1)) {
            sql = sql.concat(colName + ' = ' + res[index][i][colName] + '; ');
        } else {
            sql = sql.concat(colName + ' = ' + res[index][i][colName] + ' OR ');
        }
    }
    // console.log('SQL: ', sql)
    return sql;
}