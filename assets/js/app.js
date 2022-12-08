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

//this portion is where we find our lat and long.
var getCityName = function (cityName) {
  var locationURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=5eadcacf0e30dbacf32a851c3ca447bb";

  //here boy, this guy retrievers the lat and long of the city we input.
  fetch(locationURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var citLat = data[0].lat;
        var citLon = data[0].lon;
        console.log(citLat);
        console.log(citLon);
        //this gets our lat and long  over to our two weather api's the first gets our five day the second is our current weather.
        // getForecast(citLat, citLon);
        getWeather(citLat, citLon);
      });
    }
  });
};
// this will fetch all the data we will need.
async function getWeather(lat, lon) {
  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=5eadcacf0e30dbacf32a851c3ca447bb";
  var weatherUrl =  "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=620f19671ee57177ce7da59e3ed460e7";
  var pointOfInterestURL = "https://api.geoapify.com/v2/places?bias=proximity:" +lat + ',' + lon + '&limit=20&apiKey=b9d60eea968f40d3ab5868cce8cdd4d8'
  var [data1, data2, data3] = await  Promise.all([
    
    fetch(forecastUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data1) {
          console.log(data1);})}}),
    fetch(weatherUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data2) {
          console.log(data2);})}}),
    fetch(pointOfInterestURL).then(function (response) {
      if (response.ok) {
        response.json().then(function (data3) {
          console.log(data3);})}})
    ]);
     //this REFUSES TO LOG THE THING.... probably because it isn't actually storing things in an array of data to be used
console.log(data1, data2, data3);
};

//this will create the weather card on our page using the data from the weather API's.
//need to figure out how to get the data from getWeather and getForecast  into this function. 
function displayWeather(data1, ) {

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
  
 
//adds weather card to the page.
  resultsEl.appendChild(weatherCard);
  weatherCard.setAttribute('id', 'weather-card')

  //cityEl adds an h2 above the weather information with the chosen city name.
  weatherCard.appendChild(cityEl);
  cityEl.textContent = cityName;
  //current header creates the container that will display weather conditions.
  weatherCard.appendChild(currentHeader);
  currentHeader.setAttribute('id', 'current-header');
  //current temp should be aligned left
  currentHeader.appendChild(currentTempEl);
  currentTempEl.setAttribute('id', 'current-temp');
  currentTempEl.textContent = 'Temp: ' + temp + 'F';
  //currentWeatherEl  will be the description of conditions and shouild be placed in the center of the header.
  currentHeader.appendChild(currentWeatherEl);
  currentWeatherEl.setAttribute('id','current-weather');
  currentWeatherEl.textContent = weatherDescription;
  //Icon should be aligned right.
  currentHeader.appendChild(currentIconEl);
  currentIconEl.setAttribute('src', iconUrl);
  currentIconEl.setAttribute('id','current-icon');

  //creates the container for the 5 day forcast.
  weatherCard.appendChild(projectedContainer);
  projectedContainer.setAttribute('id', 'projected-container');

  //this loop is going to loop through and get the 5 day forcast for your time of day.
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

  //adds card to the projected container every time through the loop.
  projectedResultsEl.appendChild(projectedCard);
  //Icon should be aligned top.
  projectedCard.appendChild(projectedIconEl);
    projectedIconEl.setAttribute('src', projectedIconUrl);
    //date should be aligned middle.
  projectedCard.appendChild(projectedDateEl);
    projectedDateEl.textContent(projectedDate);
    //temp should be aligned bottom
  projectedCard.appendChild(projectedTempEl);
    projectedTempEl.textContent(currentTemp + 'F');
}

for (i=0; i<10; i++) {
  var pointOfInterest = document.createElement('div');
  var listingLogoEl = document.createElement('img');
  var infoContainer = document.createElement('div');
  var pointNameEl = document.createElement('h2');
  var  ratingEl = document.createElement('span');
  var addressEl = document.createElement('p');
  var descriptionEl = document.createElement('p');

  resultsEl.appendChild(pointOfInterest);
  pointOfInterest.setAttribute('id', 'point-of-interest');
  pointOfInterest.appendChild(listingLogoEl);
    listingLogoEl.setAttribute('id', 'listing-logo');
  pointOfInterest.appendChild(infoContainer);
    infoContainer.setAttribute('id', 'info-container');
  infoContainer.appendChild(pointNameEl);
    pointNameEl.setAttribute('id', 'point-name');
  infoContainer.appendChild(ratingEl);
    ratingEl.setAttribute('id', 'rating');
  infoContainer.appendChild(addressEl);
    addressEl.setAttribute('id', 'address');
  pointOfInterest.appendChild(descriptionEl);
    descriptionEl.setAttribute('id', 'description');
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



