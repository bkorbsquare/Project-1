$(document).foundation();

$(function () {
  $(".search").bind("click", function (event) {
    $(".search-field").toggleClass("expand-search");

    // if the search field is expanded, focus on it
    if ($(".search-field").hasClass("expand-search")) {
      $(".search-field").focus();
    }
  });
});

var getCityName = function (cityName) {
  var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=5eadcacf0e30dbacf32a851c3ca447bb";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var citLat = data[0].lat;
        var citLon = data[0].lon;

        getForecast(citLat, citLon);
        getWeather(citLat, citLon);
      });
    }
  });
};

var getForecast = function (lat, lon) {
  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=5eadcacf0e30dbacf32a851c3ca447bb";

    fetch(forecastUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
    


          })
        };
  });};

  //grabs current weather information
  var getWeather = function (lat, lon) {
    var weatherUrl =  "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=620f19671ee57177ce7da59e3ed460e7";
  
      fetch(weatherUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            displayWeather(data);
  
  
            })
          };
    });};


function displayWeather(data) {

  var weatherIcon = data.weather[0].icon;
  var weatherDescription = data.weather[0].description;
  var temp = data.main.temp;
  var resultsEl = document.querySelector('#results')
  var weatherCard = document.createElement('div');
  var cityEl = document.createElement('h2');
  var currentHeader = document.createElement('ul');
  var currentTempEl = document.createElement('li');
  var currentWeatherEl = document.createElement('li');
  var currentIconEl = document.createElement('img');
  var projectedContainer = document.createElement('div');
  var iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
  var cityName = data.name;
  
 
console.log(weatherIcon);
  resultsEl.appendChild(weatherCard);
  weatherCard.setAttribute('id', 'weather-card')
  weatherCard.appendChild(cityEl);
  cityEl.textContent = cityName;
  weatherCard.appendChild(currentHeader);
  currentHeader.setAttribute('id', 'current-header')
  currentHeader.appendChild(currentTempEl);
  currentTempEl.setAttribute('id', 'current-temp');
  currentTempEl.textContent = 'Temp: ' + temp + 'F';
  currentHeader.appendChild(currentWeatherEl);
  currentWeatherEl.setAttribute('id','current-weather');
  currentWeatherEl.textContent = weatherDescription;
  currentHeader.appendChild(currentIconEl);
  currentIconEl.setAttribute('scr', iconUrl);
  currentIconEl.setAttribute('id','current-icon');
  weatherCard.appendChild(projectedContainer);
  projectedContainer.setAttribute('id', 'projected-container');

for (i=1; i<40; i = i+8) {

  var projectedDate = data.list[i].dt_txt;
  var projectedIconUrl = 'http://openweathermap.org/img/wn/' + projectedIcon + "@2x.png"
  var projectedIcon = data.list[i].weather[0].icon;
  var currentTemp = data.list[i].main.temp;
  var projectedCard = document.createElement('ul');
  var projectedTempEl = document.createElement('li');
  var projectedDateEl = document.createElement('li');
  var projectedIconEl = document.createElement('img');
  var projectedResultsEl = document.querySelector('#projected-container');

  projectedResultsEl.appendChild(projectedCard);
  projectedCard.appendChild(projectedIconEl);
    projectedIconEl.setAttribute('scr', projectedIconUrl);
  projectedCard.appendChild(projectedDateEl);
    projectedDateEl.textContent(projectedDate);
  projectedCard.appendChild(projectedTempEl);
    projectedTempEl.textContent(currentTemp + 'F');
}
};

var cityInputEl = document.querySelector("#search");
var inputButton = document.querySelector("#submit-but");
var fiveDay = document.querySelector("#search-results");
var todaysForecast = document.querySelector("#todays-forecast");


var inputSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();
  if (cityName) {
    getCityName(cityName);
  } else {
    alert("Please enter a city");

  }

  localStorage.setItem("city", cityName);

};

inputButton.addEventListener("click", inputSubmitHandler);


