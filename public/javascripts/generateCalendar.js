function generateCalendar(d) {
/** 
* Brief description of the function here.
* @summary Takes a date object and generates a calendar object using a "table" element
* @param {ParamDataTypeHere} d - A Date() object
*/
    
        
        function monthDays(month, year) {
            // console.log('monthDays month: ', month);
            var result = [];
            var days = new Date(year, month, 0).getDate();
            for (var i = 1; i <= days; i++) {
                result.push(i);
            }
            return result;
        }
        Date.prototype.monthDays = function() {
            var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
            return d.getDate();
        };
        var details = {
            // totalDays: monthDays(d.getMonth(), d.getFullYear()),
            totalDays: d.monthDays(),
            weekDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        };
        var start = new Date(d.getFullYear(), d.getMonth()).getDay();
        // console.log(d.getFullYear());
        // console.log(d.getMonth());

        var cal = [];
        var day = 1;
        for (var i = 0; i <= 6; i++) {
            cal.push(['<tr>']);
            for (var j = 0; j < 7; j++) {
                if (i === 0) {
                    cal[i].push('<td id="caltd" style="font-weight: bold;">' + details.weekDays[j] + '</td>');
                    
                } else if (day > details.totalDays) {
                cal[i].push('<td id="caltd">&nbsp;</td>');
                } else {
                    if (i === 1 && j < start) {
                        cal[i].push('<td id="caltd">&nbsp;</td>');
                    } else {
                        // console.log('day? ', day);
                        // console.log(d.getFullYear() + '-' + (d.getMonth() +1) + "-" + day);
                        var interDate = d.getFullYear() + '-' + (d.getMonth()+1) + "-" + day;
                        // console.log(activities[interDate]);
                        if (activities[interDate]) {
                       
                                cal[i].push('<td id="caltd" class="day dot" onclick="openModal('+"'" + interDate + "'" + ')">' + day++ + '</td>');
                           
                        } else {
                            cal[i].push('<td id="caltd" class="day">' + day++ + '</td>');
                        }
                        
                        
                    }
                }
            }
            cal[i].push('</tr>');
        }
        cal = cal.reduce(function(a, b) {
            return a.concat(b);
        }, []).join('');
        $('table').append(cal);
        $('#month').text(details.months[d.getMonth()]);
        $('#year').text(d.getFullYear());
        $('td.day').mouseover(function() {
            $(this).addClass('hover');
        }).mouseout(function() {
            $(this).removeClass('hover');
        });
    }