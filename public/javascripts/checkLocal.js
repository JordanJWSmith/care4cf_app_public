function checkLocal() {
    if ((!update) && ((!(window.localStorage.getItem('routineDict'))) 
    || (!(window.localStorage.getItem('allNormals'))) 
    || (!(window.localStorage.getItem('allActivities'))))) {
        var firstUpdate = true;
        document.cookie = "dataUpdate=true;";
        document.getElementById('mainSection').innerHTML = 'Please wait...'
        window.location = "/";
    }
}