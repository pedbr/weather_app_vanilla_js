window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degrees');
  let locationTimezone = document.querySelector('.location-timezone');
  const temperatureSpan = document.querySelector('.temperature span')

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
          const { temperature, summary, icon } = data.currently;
          // Set DOM Elements from API
          
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // Formula to conver farenheit to celsius
          let celsius = (temperature - 32) * (5 / 9);
          temperatureDegree.textContent = `${Math.floor(celsius)}°`;
          temperatureSpan.textContent = "C";
          // Set Icon
          setIcons(icon, document.querySelector(".icon"));

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
          let clearNightColor = `linear-gradient(#16222A, #3A6073);`;
          let clearDayColor = `linear-gradient(#2BC0E4, #EAECC6);`;
          let rainColor = `linear-gradient(#bdc3c7, #2c3e50);`;
          let snowColor = `linear-gradient(#D3CCE3, #E9E4F0);`;
          let windColor = `linear-gradient(#C9D6FF, #E2E2E2);`;
          let partialCloudNight = `linear-gradient(#20002c, #cbb4d4);`;
          let partialCloudDay = `linear-gradient(#6190E8, #A7BFE8);`;  

          if (icon === 'CLEAR_NIGHT'){
            document.body.style.background = clearNightColor
          } else if (icon === 'CLEAR_DAY'){
            document.body.style.background = clearDayColor
          } else if (icon === 'RAIN'){
            document.body.style.background = rainColor
          } else if (icon === 'SNOW'){
            document.body.style.background = snowColor
          } else if (icon === 'SLEET'){
            document.body.style.background = snowColor
          } else if (icon === 'WIND'){
            document.body.style.background = windColor
          } else if (icon === 'FOG'){
            document.body.style.background = windColor
          } else if (icon === 'CLOUDY'){
            document.body.style.background = windColor
          } else if (icon === 'PARTLY_CLOUDY_DAY'){
            document.body.style.background = partialCloudDay
          } else if (icon === 'PARTLY_CLOUDY_NIGHT'){
            document.body.style.background = partialCloudNight
          } else {
            document.body.style.background = clearDayColor
          }
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