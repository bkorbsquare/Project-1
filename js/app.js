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

var cityInputEl = document.querySelector("#search");
var inputButton = document.querySelector("#submit-but");
var fiveDay = document.querySelector("#search-results");
var inputSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();
  console.log(cityName);
  if (cityName) {
    getCords(cityName);
  } else {
    alert("Please enter a city");
  }
  /* localStorage.setItem("city", cityName);
  todaysForecast.textContent = "";
  displaySearched(cityName);*/
};

var getCords = function (cityName) {
  var apiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=5&appid=620f19671ee57177ce7da59e3ed460e7";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var citLat = data[0].lat;
        var citLon = data[0].lon;
        console.log(citLat);
        console.log(citLon);

        getForecast(citLat, citLon);
      });
    }
  });
};

var getForecast = function (lat, lon) {
  var apiTwoUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=620f19671ee57177ce7da59e3ed460e7";

  fetch(apiTwoUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);

        var cityName = data.city.name;
        var cityDate = data.list[3].dt_txt;
        var weatherIcon = data.list[3].weather[0].icon;
        var humidity = data.list[3].main.humidity;
        var temp = data.list[3].main.temp;
        var windSpeed = data.list[3].wind.speed;

        /* var cityEl = document.createElement("div");
        cityEl.textContent = cityName;
        todaysForecast.appendChild(cityEl);
        var dateEl = document.createElement("div");
        dateEl.textContent = "Date: " + cityDate;
        cityEl.appendChild(dateEl);
        var weatherEl = document.createElement("div");
        weatherEl.textContent = weatherIcon;
        dateEl.appendChild(weatherEl);
        var humidityEl = document.createElement("div");
        humidityEl.textContent = "Humidity: " + humidity;
        weatherEl.appendChild(humidityEl);
        var tempEl = document.createElement("div");
        tempEl.textContent = "Temperature: " + temp + "F";
        humidityEl.appendChild(tempEl);
        var speedEl = document.createElement("div");
        speedEl.textContent = "Wind Speed: " + windSpeed;
        tempEl.appendChild(speedEl);
*/
        let dayNum = 1;
        for (var i = 0; i < data.list.length; i = i + 8) {
          var dayBox = document.getElementById("day" + dayNum);
          var oneDay = data.list[i];
          console.log(oneDay);

          var date = oneDay.dt_txt;
          var dateBox = document.createElement("div");
          dateBox.textContent = date;
          dayBox.appendChild(dateBox);

          var icon = oneDay.weather[0].icon;
          var iconBox = document.createElement("div");
          iconBox.textContent = icon;
          dateBox.appendChild(iconBox);

          var temp5 = oneDay.main.temp;
          var tempBox = document.createElement("div");
          tempBox.textContent = temp5 + "degrees";
          iconBox.appendChild(tempBox);

          var wind = oneDay.wind.speed;
          var windBox = document.createElement("div");
          windBox.textContent = wind + "mph";
          iconBox.appendChild(windBox);

          var humidity5 = oneDay.main.humidity;
          var humidBox = document.createElement("div");
          humidBox.textContent = humidity5;
          windBox.appendChild(humidBox);

          dayNum++;
        }
      });
    }
  });
};

inputButton.addEventListener("click", inputSubmitHandler);
