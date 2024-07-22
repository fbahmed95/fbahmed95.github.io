const WEATHER_MAPPING_GIF = {
    200	: "../images/weather_types/raining_sky.gif",
    201	: "../images/weather_types/raining_sky.gif",
    202	: "../images/weather_types/raining_sky.gif",
    210	: "../images/weather_types/raining_sky.gif",
    211	: "../images/weather_types/raining_sky.gif",
    212	: "../images/weather_types/raining_sky.gif",
    221	: "../images/weather_types/raining_sky.gif",
    230	: "../images/weather_types/raining_sky.gif",
    231	: "../images/weather_types/raining_sky.gif",
    232 : "../images/weather_types/raining_sky.gif",
    300 : "../images/weather_types/raining_sky.gif",
    301 : "../images/weather_types/raining_sky.gif",
    302 : "../images/weather_types/raining_sky.gif",
    310 : "../images/weather_types/raining_sky.gif",
    311 : "../images/weather_types/raining_sky.gif",
    312 : "../images/weather_types/raining_sky.gif",
    313 : "../images/weather_types/raining_sky.gif",
    314 : "../images/weather_types/raining_sky.gif",
    321 : "../images/weather_types/raining_sky.gif",
    500 : "../images/weather_types/raining_sky.gif",
    501 : "../images/weather_types/raining_sky.gif",
    502 : "../images/weather_types/raining_sky.gif",
    503 : "../images/weather_types/raining_sky.gif",
    504 : "../images/weather_types/raining_sky.gif",
    511 : "../images/weather_types/raining_sky.gif",
    520 : "../images/weather_types/raining_sky.gif",
    521	: "../images/weather_types/raining_sky.gif",
    522 : "../images/weather_types/raining_sky.gif",
    531 : "../images/weather_types/raining_sky.gif",
    701	: "../images/weather_types/smokey_sky.gif",
    711	: "../images/weather_types/smokey_sky.gif",
    721	: "../images/weather_types/smokey_sky.gif",
    731	: "../images/weather_types/smokey_sky.gif",
    741	: "../images/weather_types/smokey_sky.gif",
    751	: "../images/weather_types/smokey_sky.gif",
    761	: "../images/weather_types/smokey_sky.gif",
    762	: "../images/weather_types/smokey_sky.gif",
    771	: "../images/weather_types/smokey_sky.gif",
    781 : "../images/weather_types/smokey_sky.gif",
    800 : "../images/weather_types/clear_sky.gif",
    801 : "../images/weather_types/cloudy_sky.gif",
    802 : "../images/weather_types/cloudy_sky.gif",
    803 : "../images/weather_types/cloudy_sky.gif",
    804 : "../images/weather_types/cloudy_sky.gif",
}

const convertTimestamp = (dt, type) => {
    if(type == "time"){
        var date = new Date(dt * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2);
    } else if (type == "date"){
        var date = new Date(dt * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        return date.toDateString() + " " + hours + ':' + minutes.substr(-2)
    }
}

const getWeather = async (lat, lon) => {
    api_key = "86d4d5ab0b3da5b16040522a0629c195"
    // https://openweathermap.org/forecast5 documentation
    const res = await getRestCall(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial&exclude=minutely,alerts`);
    if(res.cod == 401){
        return {error: "weather not found"};
    } else {
        return res;
    }
}

const generateWeekContent = (data) => {
    var date = convertTimestamp(data.dt, "date");
    var icon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    var temp = data.temp.day;
    return `<div class="week-content-box">
                <div class="week-content-date">${date}</div>
                <div class="week-content-info">
                    <div class="week-content-temp">${temp}</div>
                    <div class="week-content-icon"><img src="${icon}"/> </div>
                </div>
            </div>`
}

const handleWeatherRes = (weather_res) => {
    if(weather_res.error){
        alert(weather_res.error)
    } else {
        // today's stuff
        var current = weather_res.current;
        for(var item in current){
            if(item.includes("sun")){
                $(`#today-${item}`).html(convertTimestamp(current[item], "time"))
            } else {
                $(`#today-${item}`).html(current[item])
            }
        }

        // set background image on main banner
        var current_code = current.weather[0].id;
        generateCSSVariable("today-temp-background", `url('${WEATHER_MAPPING_GIF[current_code]}')`)

        var current_description = current.weather[0].description;
        $("#description").html(current_description);

        // get date
        var date = new Date(current.dt * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        var formattedTime = date.toDateString() + " " + hours + ':' + minutes.substr(-2)
        $("#date").html(formattedTime)

        // get the next every 3 hours , 4 times
        var hourly_data = weather_res.hourly;
        var time_arr = [];
        var data_arr = []
        for(var i = 0; i < 4; i++){
            var hour_data = hourly_data[i * 4];
            time_arr.push(convertTimestamp(hour_data.dt, "time"))
            data_arr.push(hour_data.temp);
        }
        // generate chart
        var graph_url = getWeatherGraphURL(time_arr, data_arr)
        $(".today-banner-graph").html(`<img src="${graph_url}"/>`)

        // do week's data
        var week_data = weather_res.daily;
        var week_data_html = "";
        for(var i = 0; i < week_data.length; i++){
            week_data_html += generateWeekContent(week_data[i])
        }
        $(".week-content").html(week_data_html)
    }
}