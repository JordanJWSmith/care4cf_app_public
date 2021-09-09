function checkLocal() {
    if ((!update) && ((!(window.localStorage.getItem('routineDict'))) 
    || (!(window.localStorage.getItem('allNormals'))) 
    || (!(window.localStorage.getItem('allActivities'))) 
    || (!(window.localStorage.getItem('dateList'))))) {
        var firstUpdate = true;
        console.log('firstUpdate');
        document.cookie = "dataUpdate=true;";
        document.getElementById('mainSection').innerHTML = 'Please wait...'
        // window.sessionStorage.setItem('dataUpdate', 'true');
        window.location = "/";
        // return true;
    }
}