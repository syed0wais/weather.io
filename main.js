'use strict'
const place = document.querySelector('.place-heading');
const temp = document.querySelector('.temp-number');
const weatherDescription = document.querySelector('.weather-description');
const date = document.querySelector('.date-text');

const minTemp = document.querySelector('.min-temp');
const maxTemp = document.querySelector('.max-temp');

const searchQuery = document.querySelector('.search-query');
const weatherIcon = document.querySelector('.weather-icon');
const contentBox = document.querySelector('.content');
const errorMeesage = document.querySelector('.error-message');
errorMeesage.defaultValue ="Error";
this.showCurrrentLocaationWeather();
const errorBox = document.querySelector('.error');

//Show current Date
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();
let month = months[d.getMonth()];
let dateDay = d.getDate();
let dateString = month + ' ' + dateDay;
console.log(dateString);
date.innerHTML = dateString;


//Utility Functions
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}







searchQuery.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    console.log(searchQuery.value);
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery.value}&appid=07910dfd9ca40f69d0255d54b48baeeb`).then(res => {
      
      errorBox.classList.add("hidden");
      contentBox.classList.remove("hidden");

      weatherDescription.innerHTML = capitalizeFirstLetter(res.data.weather[0].description);
      temp.innerHTML = parseInt(res.data.main.temp - 273);
      // minTemp.innerHTML = parseInt(res.data.main.temp_min - 273);
      // maxTemp.innerHTML = parseInt(res.data.main.temp_max - 273);
      const iconCode = res.data.weather[0].icon;
      weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      place.innerHTML = res.data.name;
      searchQuery.value=""
    }).catch(() => {
      contentBox.classList.add("hidden");
      errorBox.classList.remove("hidden");
      errorMeesage.innerHTML = `${searchQuery.value} Not Found 😔`

    })

  }
});
// console.log(searchQuery);
// console.log(temp);



// import axios from 'axios'
function showCurrrentLocaationWeather() {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=07910dfd9ca40f69d0255d54b48baeeb`).then(res => {

      weatherDescription.innerHTML = capitalizeFirstLetter(res.data.weather[0].description);
      temp.innerHTML = parseInt(res.data.main.temp - 273);
      // minTemp.innerHTML = parseInt(res.data.main.temp_min - 273);
      // maxTemp.innerHTML = parseInt(res.data.main.temp_max - 273);
      const iconCode = res.data.weather[0].icon;
      weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      place.innerHTML = res.data.name;
      contentBox.classList.remove("hidden");
      errorBox.classList.add("hidden");
    })
  }, error => {
    if (error.code == error.PERMISSION_DENIED)
    errorMeesage.innerHTML = `Please make sure your location is enabled`
  }
  );
};

