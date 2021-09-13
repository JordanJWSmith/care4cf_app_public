function getCook(cookiename) {
      /** 
    * 
    * @summary Return a given cookie
    * @param {String} cookiename - Name of the desired cookie
    * @return {String} The contents of the desired cookie
    */

    // Get name followed by anything except a semicolon
    var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}