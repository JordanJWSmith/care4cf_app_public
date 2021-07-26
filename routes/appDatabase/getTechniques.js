var readData = require('./readData');

module.exports = async function() {

        var checkLogin =  "SELECT * FROM techdescriptions WHERE techniqueType = ? OR techniqueType = ? ORDER BY techniqueType DESC";
        var data = ['Device-Free', 'Device-Dependent'];
        var results = await readData(checkLogin, data);
        // console.log('getTechnique results:', results);
        // console.log('getTechnique length: ', results.length);

        // var techniqueDict = {'Device-Free':[], 'Device-Dependent':[]}
        // console.log('results: ', results);
        // // console.log('first? ', results[0]);
        // for (var i = 0; i < results.length; i++) {
        //     console.log('iterate: ', results[i]);
        //     //Do something
        //     for (var key in Object.keys(techniqueDict)) {
        //         if (results[i].techniqueType == key) {
        //             techniqueType[key].push(results[i].title);
        //         }
        //     }
            
        //     // if (results[i].techniqueType == 'Device-Free') {
        //     //     techniqueDict['Device-Free'].push(results[i].title);
        //     // } else {
        //     //     techniqueDict['Device-Dependent'].push(results[i].title);
        //     // }
            
            
        // }

        // console.log('dict: ', techniqueDict);
        // console.log(Object.keys(techniqueDict));
        
        
        
        return { 
           results
        //    fName: results[0].fName 
        }
    }
    
