const API_KEY = "a8fe9cc112be4c6fe96765e4e53adbc7";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherImg = document.getElementById("weatherImg");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feels = document.getElementById("feels");
const pressure = document.getElementById("pressure");


function getWeatherByCity(cityName) {
    if (!cityName.trim()) return showError("Please enter city name");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`;
    fetchWeather(url);
}


async function fetchWeather(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
            throw new Error("City not found");
        }

        updateUI(data);
    } catch (err) {
        showError(err.message);
    }
}


function updateUI(data) {
    const type = data.weather[0].main.toLowerCase();

    if (type.includes("rain")) {
        weatherImg.src = "images/rainy.png";
    } else if (type.includes("cloud")) {
        weatherImg.src = "images/cloudy.png";
    } else {
        weatherImg.src = "images/sunny.png";
    }

    city.innerHTML = `<i class="fas fa-location-dot"></i> ${data.name}, ${data.sys.country}`;
    temp.innerText = `${Math.round(data.main.temp)}°C`;
    desc.innerText = data.weather[0].description;

    humidity.innerText = `Humidity: ${data.main.humidity}%`;
    wind.innerText = `Wind: ${data.wind.speed} m/s`;
    feels.innerText = `Feels: ${Math.round(data.main.feels_like)}°C`;
    pressure.innerText = `Pressure: ${data.main.pressure} hPa`;
}


function showError(msg) {
    city.innerHTML = "❌ Error";
    desc.innerText = msg;
    temp.innerText = "";
    weatherImg.src = "";
    humidity.innerText = "";
    wind.innerText = "";
    feels.innerText = "";
    pressure.innerText = "";
}


searchBtn.addEventListener("click", () => {
    getWeatherByCity(cityInput.value);
});

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") getWeatherByCity(cityInput.value);
});
