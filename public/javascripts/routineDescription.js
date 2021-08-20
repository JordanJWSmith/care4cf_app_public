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

function routineDescription2(description, element) {
    // document.getElementById(element).innerHTML += '<div id="routineDescription"></div>';

    // document.getElementById('routineDescription').style['background-color'] = 'rgba(222, 227, 238, 0.7)';
    // document.getElementById('routineDescription').style['padding'] = '2vh';
    // document.getElementById('routineDescription').style['width'] = '80%';
    // document.getElementById('routineDescription').style['max-width'] = '400px';
    // document.getElementById('routineDescription').style['margin'] = 'auto';
    // document.getElementById('routineDescription').style['max-height'] = '42vh';
    // document.getElementById('routineDescription').style['overflow'] = 'scroll';
    // document.getElementById('routineDescription').style['border-radius'] = '10px';

    var table = document.createElement('table');
    table.setAttribute("id", "routineTable");
    // document.getElementById('routineDescription').appendChild(table);
    document.getElementById(element).appendChild(table);

    var keys = Object.keys(description);

    for (var i = 0; i < keys.length; i++) {
        title = keys[i];
        if ((title !== 'title') && (description[title])) {
            document.getElementById('routineTable').innerHTML += '<tr><td><img src="./images/'+title+'Icon.png" style="max-height: 6vh;"></td><td><div id="'+ title +'"></div></td></tr>';
            // document.getElementById('routineDescription').innerHTML += '<div id="' + title + 'routineContainer"></div>'
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


function populateRoutine(description, element) {
    // var dateString = dateList[dayCounter];
    var activities = routineDict[dateString];
    // console.log('dateString: ', dateString);
    // console.log('activities: ', activities)
    // console.log('title: ', activities.title);
    // var stringActivities = JSON.stringify(weekActivities[dayCounter]);
    // var activities = JSON.parse(stringActivities);
    // console.log(activities);
    // document.getElementById('routine').innerHTML += '<p>' + activities.title + '</p>';
    document.getElementById(element).innerHTML += '<p>' + description.title + '</p>';
    // delete activities.title;
    // delete activities.title;
    // var keys = Object.keys(activities);
    document.getElementById(element).innerHTML += '<div id="routineDescription"></div>';
            // document.getElementById('routine').innerHTML += '<div id="icons" style="height: 100%; "></div>'

    document.getElementById('routineDescription').style['background-color'] = 'rgba(222, 227, 238, 0.7)';
    document.getElementById('routineDescription').style['padding'] = '2vh';
    document.getElementById('routineDescription').style['width'] = '80%';
    document.getElementById('routineDescription').style['max-width'] = '400px';
    document.getElementById('routineDescription').style['margin'] = 'auto';
    document.getElementById('routineDescription').style['max-height'] = '42vh';
    document.getElementById('routineDescription').style['overflow'] = 'scroll';
    document.getElementById('routineDescription').style['border-radius'] = '10px';

    var table = document.createElement('table');
    table.setAttribute("id", "routineTable");
    document.getElementById('routineDescription').appendChild(table);

    
    // document.getElementById('routineDescription').innerHTML += '<table style="width:100%></table>';

    var keys = Object.keys(description);
    
    for (var i = 0; i < keys.length; i++) {
        title = keys[i];
        console.log(title);
        if ((title !== 'title') && (description[title])) {

            
            document.getElementById('routineTable').innerHTML += '<tr><td><img src="./images/'+title+'Icon.png" style="max-height: 6vh;"></td><td><div id="'+ title +'"></div></td></tr>';

            // console.log('title: ', title); 
            // console.log('content: ', activities[title]);
            document.getElementById('routineDescription').innerHTML += '<div id="' + title + 'routineContainer"></div>'
            
            // document.getElementById(title + 'routineContainer').innerHTML += '<div id="'+ title +'icon">Icon</div>';
            document.getElementById(title + 'routineContainer').innerHTML += '<div id="'+ title +'"></div>';
            
            document.getElementById(title).style['padding'] = '1vh';
            // document.getElementById(title).style['padding-left'] = '20%';

            // document.getElementById(title).innerHTML += '<dt>' + title + ':</dt>';
            // document.getElementById(title).innerHTML += '<div class="alignleft" id="iconTest">Test</div>';
            


            // document.getElementById(title).style['opacity'] = '0.4';

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
                document.getElementById(title).innerHTML += '<dd style="font-size: 10pt; margin-top:10px">' + activities[title] + '</dd>';
            }
        }
        
        // console.log(activities[title]);
    }
}
