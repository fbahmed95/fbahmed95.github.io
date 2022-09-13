getLocation().then(async WEATHER_LOCATION => {
    let weather_res;
    if(WEATHER_LOCATION && WEATHER_LOCATION.error){ 
        alert(WEATHER_LOCATION.error)
    } else {
        weather_res = await getWeather(WEATHER_LOCATION.coords.latitude, WEATHER_LOCATION.coords.longitude);
        if(weather_res){
            hideLoader();
            handleWeatherRes(weather_res);
        }
        location_res = await getCityFromCoordinates(WEATHER_LOCATION.coords.latitude, WEATHER_LOCATION.coords.longitude)
        handleLocationRes(location_res);
    }
}); 

