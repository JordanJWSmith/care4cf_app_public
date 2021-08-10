function routineDescription(description, element) {
    
    document.getElementById(element).innerHTML += '<p>' + description.title + '</p>';

    var keys = Object.keys(description);
   
    for (var i = 0; i < keys.length; i++) {
        title = keys[i];
        if ((title !== 'title') && (description[title])) {
            document.getElementById(element).innerHTML += '<a id="'+ title +'"></a>';
            document.getElementById(title).innerHTML += '<dt>' + title + ':</dt>';
            if (description[title][0] == '[') {
                activitiesList = JSON.parse(description[title]);
                for (var j = 0; j < activitiesList.length; j++) {
                    if (typeof activitiesList[j] == "object") {
                        document.getElementById(title).innerHTML += '<dd>' + activitiesList[j][0] + ' (' + activitiesList[j][1] + ') ' + '</dd>';
                    } else {
                        document.getElementById(title).innerHTML += '<dd>' + activitiesList[j] + '</dd>';
                    }
                }
            } else {
                document.getElementById(title).innerHTML += '<dd>' + description[title] + '</dd>';
            }
        }
    }
}