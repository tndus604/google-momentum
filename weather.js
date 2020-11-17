const API_KEY = "7af58658ce9879f855d15cc7e207e8b6";
const weatherContainer = document.querySelector(".js-weather");


function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
            weatherContainer.innerHTML = `
            <div class="temp">
                <img id="wicon" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather icon">${Math.round(data.main.temp)}°C
                <br><span class="area">${data.name}</span>
            </div>`;           
        });
}

function handleSuccess(position) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        'latitude': latitude, 
        'longitude': longitude
    };

    localStorage.setItem("coords", JSON.stringify(coordsObj));
    getWeather(latitude, longitude);
    
}

function handleError() {
    console.log("Error!");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem("coords");
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        console.log(parsedCoords);
        const lat = parsedCoords.latitude;
        const lon = parsedCoords.longitude;

        getWeather(lat, lon);
    }
}

function init() {
    loadCoords();
}

init();