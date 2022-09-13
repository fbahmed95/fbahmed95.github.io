const LOCATION_ERROR_MESSAGES = {
    418 : "Geolocation is not supported by this browser", // i am a teapot
    403 : "User denied the request for Geolocation.", // forbidden
    204 : "Location information is unavailable.", // no content
    408 : "The request to get user location timed out.", // timeout
    404 : "An unknown error occurred." // not found
}


const getCityFromCoordinates = async (lat, lon) => {
  const api_key = "AIzaSyCgeSMb9jRH3CY4bgQzOxyHlq4zRi0mAQk";
  // https://openweathermap.org/forecast5 documentation
  // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCgeSMb9jRH3CY4bgQzOxyHlq4zRi0mAQk
  const res = await getRestCall(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${api_key}`);
  var city,
      state;
  if (res.status == "OK") {
    res.results.forEach(function(element){
      element.address_components.forEach(function(element2){
        element2.types.forEach(function(element3){
          switch(element3){
            case 'administrative_area_level_1':
              state = element2.long_name;
              break;
            case 'locality':
              city = element2.long_name;
              break;
          }
        })
      });
    });
  }

  return city + ", " + state;
}

const getLocation = () => { 
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject); // use errorhandler
        } else {
            return LOCATION_ERROR_MESSAGES[418];
        }
    })
}

const locationErrorHandler = (error) => {
  switch(error.code) {
    case error.PERMISSION_DENIED:
        return {error : LOCATION_ERROR_MESSAGES[403]};
      break;
    case error.POSITION_UNAVAILABLE:
        return {error : LOCATION_ERROR_MESSAGES[204]};
      break;
    case error.TIMEOUT:
        return {error : LOCATION_ERROR_MESSAGES[408]};
      break;
    case error.UNKNOWN_ERROR:
        return {error : LOCATION_ERROR_MESSAGES[404]};
      break;
  }
}

const handleLocationRes = (res) => {
  $(".location").html(res);
}