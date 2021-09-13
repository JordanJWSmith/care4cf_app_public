function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function loadingModal() {
    /** 
    * Open the prompt modal
    */
    if (iOS()) {
        document.getElementById('loadingModal').style.display = "block";
    } else {
        setTimeout(function() {
            if (navigator.onLine) {
                document.getElementById('loadingModal').style.display = "block";
            } 
        }, 1500)
    }
}