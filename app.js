window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degrees');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSpan = document.querySelector('.temperature span');
  let maxTemperatureInfo = document.querySelector('.max-temp-info');
  let minTemperatureInfo = document.querySelector('.min-temp-info');
  let sunriseInfo = document.querySelector('.sunrise-info');
  let sunsetInfo = document.querySelector('.sunset-info');
  let windSpeedInfo = document.querySelector('.wind-speed-info');
  let rainProbabilityInfo = document.querySelector('.rain-prob-info');
  let humidityInfo = document.querySelector('.humidity-info');

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      
      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.darksky.net/forecast/4a0fd97e4b1e4f1f043d7388cb0244a1/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .catch(error => {
          console.log(error);
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon, precipProbability, windSpeed, humidity } = data.currently;
          const { temperatureLow, temperatureMax, sunriseTime, sunsetTime } = data.daily.data[1]
          // Set DOM Elements from API
          
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          // Formula to conver farenheit to celsius
          let celsius = (temperature - 32) * (5 / 9);
          temperatureDegree.textContent = `${Math.floor(celsius)}°`;
          temperatureSpan.textContent = "C";

          // Set Icon
          setIcons(icon, document.querySelector(".icon"));

          // ADDING EXTRA ELEMENTS

          // Today's maximum temperature
          let celsiusMax = (temperatureMax - 32) * (5 / 9);
          maxTemperatureInfo.textContent = `${Math.floor(celsiusMax)}°C`;

          // Today's minimum temperature
          minTemperatureInfo.textContent = temperatureLow;

          // Today's sunrise time
          sunriseInfo.textContent = sunriseTime;

          // Today's sunset time
          sunsetInfo.textContent = sunsetTime;

          // Current wind speed
          windSpeedInfo.textContent = windSpeed;

          // Current probability of rain
          rainProbabilityInfo.textContent = precipProbability;

          // Current humidity
          humidityInfo.textContent = humidity;

          // Change temperature between celsius/farenheit
          temperatureDegree.addEventListener('click', () =>{
            if(temperatureSpan.textContent === "F"){
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = `${Math.floor(celsius)}°`;
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = `${Math.floor(temperature)}°`;
            }
          });
        });
    });
  } else {
    h1.textContent = "Please enable your location to view the weather!"
  }

  function setIcons(icon, iconID){
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

});