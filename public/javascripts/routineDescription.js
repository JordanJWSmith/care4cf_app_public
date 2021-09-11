

function routineDescription(description, element) {


    var table = document.createElement('table');
    table.setAttribute("id", "routineTable");
    document.getElementById(element).innerHTML += "<p>" + description['title'] + '<p>';
    document.getElementById(element).appendChild(table);

    var keys = Object.keys(description);

    for (var i = 0; i < keys.length; i++) {
        title = keys[i];

        if ((title !== 'title') && (description[title])) {
            document.getElementById('routineTable').innerHTML += '<tr><td><img src="./images/'+title+'Icon.png" alt="'+title+'" style="max-height: 6vh;"></td><td><div id="'+ title +'"></div></td></tr>';
            document.getElementById(element).innerHTML += '<div id="' + title + 'routineContainer"></div>'

            document.getElementById(title + 'routineContainer').innerHTML += '<div id="'+ title +'"></div>';
            document.getElementById(title).style['padding'] = '1vh';

            if (description[title][0] == '[') {
                activitiesList = JSON.parse(description[title]);
                for (var j = 0; j < activitiesList.length; j++) {
                    if (typeof activitiesList[j] == "object") {
                        document.getElementById(title).innerHTML += '<dd style="font-size: 10pt; margin-top:10px">' + activitiesList[j][0] + ' (' + activitiesList[j][1] + ') ' + '</dd>';
                    } else {
                        document.getElementById(title).innerHTML += '<dd style="font-size: 10pt; margin-top:10px">' + activitiesList[j] + '</dd>';
                    }
                }
            } else {
                document.getElementById(title).innerHTML += '<dd style="font-size: 10pt; margin-top:10px">' + description[title] + '</dd>';
            }
        }
    }

}
