let current = new Date();
let date = current.getDate();
function formatDate() {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  let day = days[current.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[current.getMonth()];
  let displayCurrentDate = document.querySelector("#current-day");
  displayCurrentDate.innerHTML = `${date} ${month}, ${day}`;
}

let hour = current.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = current.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let displayCurrentTime = document.querySelector("#current-time");
displayCurrentTime.innerHTML = `${hour}:${minute}`;
formatDate();

function displayWeather(response) {
  let forecastResult = Math.round(response.data.main.temp);
  let humidityValue = Math.round(response.data.main.humidity);
  let descriptionText = response.data.weather[0].description;
  let windValue = Math.round(response.data.wind.speed);

  celciusTemperature = response.data.main.temp;

  let h1 = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let description = document.querySelector("#description");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  h1.innerHTML = response.data.name;
  temperature.innerHTML = `${forecastResult} ºC`;
  humidity.innerHTML = `${humidityValue} %`;
  wind.innerHTML = `Wind: ${windValue} m/s`;
  description.innerHTML = `Description: ${descriptionText}`;
}

function searchCity(city) {
  let apiKey = "e20030b739fa4b57697d8d1509e9edd5";
  let units = "metric";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${endPoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "e20030b739fa4b57697d8d1509e9edd5";
  let apiUrl = `${apiEndPoint}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Sydney");
