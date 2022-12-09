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
$(window).scroll(function () {
  var winScrollTop = $(window).scrollTop();
  var winHeight = $(window).height();
  var floaterHeight = $("#resetBtn").outerHeight(true);
  var fromBottom = 20;
  var top = winScrollTop + winHeight - floaterHeight - fromBottom;
  $("#resetBtn").css({ top: top + "px" });
});
var resultsEl = document.querySelector("#results");
var weatherCard = document.createElement("div");

//this portion is where we find our lat and long.
var getCityName = function (cityName) {
  var locationURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=5&appid=5eadcacf0e30dbacf32a851c3ca447bb";

  //here boy, this guy retrievers the lat and long of the city we input.
  fetch(locationURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var citLat = data[0].lat;
        var citLon = data[0].lon;
        var city = data[0].name;
        var cityEl = document.createElement("h2");

        //adds weather card to the page.
        weatherCard.setAttribute("id", "weather-card");
        resultsEl.appendChild(weatherCard);
        //cityEl adds an h2 above the weather information with the chosen city name.
        weatherCard.appendChild(cityEl);
        cityEl.textContent = city;

        getWeather(citLat, citLon);
        getPointsOfInterest(citLat, citLon);
      });
    }
  });
};
// this will fetch all the data we will need.
function getWeather(lat, lon) {
  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=f48eeb974e0cd19636dc2234eda9e443";

  console.log("forecastData");
  fetch(forecastUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(data);
        console.log(data);
      });
    }
  });
}

function getPointsOfInterest(lat, lon) {
  var pointOfInterestURL =
    "https://api.geoapify.com/v2/places?categories=accommodation.hotel&bias=proximity:" +
    lon +
    "," +
    lat +
    "&limit=20&apiKey=b9d60eea968f40d3ab5868cce8cdd4d8";
  console.log(pointOfInterestURL);
  fetch(pointOfInterestURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayResults(data);
      });
    }
  });
}

// https://api.geoapify.com/v2/place-details?drive_15.fuel,drive_15.hotel,

function getPointsOfInterest(lat, lon) {
  var pointOfInterestURL =
    "https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:" +
    lon +
    "," +
    lat +
    ",5000&limit=20&apiKey=b9d60eea968f40d3ab5868cce8cdd4d8";

  fetch(pointOfInterestURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayResults(data);
      });
    }
  });
}

//this will create the weather card on our page using the data from the weather API's.
//need to figure out how to get the data from getWeather and getForecast  into this function.
function displayWeather(data) {
  console.log(data);

  var temp = data.current.temp;
  var weatherDescription = data.current.weather[0].description;
  var weatherIcon = data.current.weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
  var weatherCard = document.querySelector("#weather-card");
  var cityEl = document.createElement("h2");
  var currentHeader = document.createElement("ul");
  var currentTempEl = document.createElement("li");
  var currentWeatherEl = document.createElement("li");
  var currentIconEl = document.createElement("img");
  var projectedContainer = document.createElement("div");

  //current header creates the container that will display weather conditions.
  weatherCard.appendChild(currentHeader);
  currentHeader.setAttribute("id", "current-header");
  console.log();
  //current temp should be aligned left
  currentHeader.appendChild(currentTempEl);
  currentTempEl.setAttribute("id", "current-temp");
  currentTempEl.textContent = "Temp: " + temp + "° F";
  console.log("please");
  //currentWeatherEl  will be the description of conditions and should be placed in the center of the header.
  currentHeader.appendChild(currentWeatherEl);
  currentWeatherEl.setAttribute("id", "current-weather");
  currentWeatherEl.textContent = weatherDescription;
  //Icon should be aligned right.
  currentHeader.appendChild(currentIconEl);
  currentIconEl.setAttribute("src", iconUrl);
  currentIconEl.setAttribute("id", "current-icon");

  //creates the container for the 5 day forcast.
  weatherCard.appendChild(projectedContainer);
  projectedContainer.setAttribute("id", "projected-container");

  //this loop is going to loop through and get the 5 day forcast for your time of day.
  for (i = 1; i < 6; i++) {
    var unix = data.daily[i].dt * 1000;
    var projectedDate = dayjs(unix).format("dddd, MMMM D");
    console.log(projectedDate);
    var projectedIcon = data.daily[i].weather[0].icon;
    var projectedIconUrl =
      "http://openweathermap.org/img/wn/" + projectedIcon + "@2x.png";
    var currentTemp = data.daily[i].temp.day;
    var projectedCard = document.createElement("ul");
    var projectedTempEl = document.createElement("li");
    var projectedDateEl = document.createElement("li");
    var projectedIconEl = document.createElement("img");
    var projectedResultsEl = document.querySelector("#projected-container");
    console.log(projectedIconUrl);
    //adds card to the projected container every time through the loop.
    projectedResultsEl.appendChild(projectedCard);
    projectedCard.setAttribute("id", "projected-card");
    //Icon should be aligned top.
    projectedCard.appendChild(projectedIconEl);
    projectedIconEl.setAttribute("src", projectedIconUrl);
    projectedIconEl.setAttribute("id", "projected-icon");
    //date should be aligned middle.
    projectedCard.appendChild(projectedDateEl);
    projectedDateEl.setAttribute("id", "projected-date");
    projectedDateEl.textContent = projectedDate;

    //temp should be aligned bottom
    projectedCard.appendChild(projectedTempEl);
    projectedTempEl.textContent = currentTemp + "° F";
  }
  var initialSearchEl = document.querySelector("#initial-search");
  initialSearchEl.setAttribute("class", "hide");
  var resetBtnEl = document.querySelector("#resetBtn");
  resetBtnEl.removeAttribute("class", "hide");
}
function displayResults(data) {
  console.log(data);
  for (i = 0; i < 10; i++) {
    var pointOfInterest = document.createElement("div");
    var listingLogoEl = document.createElement("img");
    // var logoURL =
    var infoContainer = document.createElement("div");
    var pointNameEl = document.createElement("h2");
    var pointName = data.features[i].properties.address_line1;
    var ratingEl = document.createElement("span");
    var rating = data.features[i].properties.datasource.raw.stars;
    var addressEl = document.createElement("p");
    var address = data.features[i].properties.address_line2;
    var descriptionEl = document.createElement("p");
    var description = data.features[i].properties.details[0];
    console.log(description);
    resultsEl.appendChild(pointOfInterest);
    pointOfInterest.setAttribute("id", "point-of-interest");
    pointOfInterest.appendChild(listingLogoEl);
    listingLogoEl.setAttribute("id", "listing-logo");
    // listingLogoEl.setAttribute('src', logoURL);
    pointOfInterest.appendChild(infoContainer);
    infoContainer.setAttribute("id", "info-container");
    infoContainer.appendChild(pointNameEl);
    pointNameEl.setAttribute("id", "point-name");
    pointNameEl.textContent = pointName;
    infoContainer.appendChild(ratingEl);
    ratingEl.setAttribute("id", "rating");
    ratingEl.textContent = "Rating: " + rating;
    infoContainer.appendChild(addressEl);
    addressEl.setAttribute("id", "address");
    addressEl.textContent = address;
    pointOfInterest.appendChild(descriptionEl);
    descriptionEl.setAttribute("id", "description");
    descriptionEl.textContent =
      "description placeholder rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble rabble";
  }
}
var cityInputEl = document.querySelector("#search");
var inputButton = document.querySelector("#submit-but");
var fiveDay = document.querySelector("#search-results");
var todaysForecast = document.querySelector("#todays-forecast");

var inputSubmitHandler = function (event) {
  event.preventDefault();
  resultsEl.textContent = "";
  weatherCard.textContent = "";

  var cityName = cityInputEl.value.trim();
  if (cityName) {
    getCityName(cityName);
  } else {
    alert("Please enter a city");
  }

  localStorage.setItem("city", cityName);
};

inputButton.addEventListener("click", inputSubmitHandler);
