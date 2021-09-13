function logout() {
      /** 
    * 
    * @summary Log out of the site by removing cookies and clearing local storage
    * @param {String} cookiename - Name of the desired cookie
    * @return {String} The contents of the desired cookie
    */
   
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }
    window.localStorage.clear();
    if (!(navigator.onLine) && (!(getCook('accessToken')))) {
       
        window.location.href = "/loginUser"
    } else {
        location.reload();
    }
};