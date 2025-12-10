// weather.js

// weather.js

export async function initWeather() {
    const location = await fetch("data/settings/location.json")
        .then(res => res.json());

    const lat = location.latitude;
    const lon = location.longitude;
    const tz = location.timezone || "Europe/Berlin";

    const weatherBox = {
        icon: document.getElementById("weather-icon"),
        temp: document.getElementById("weather-temp")
    };

    async function updateWeather() {
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=${tz}`;
            const data = await fetch(url).then(r => r.json());

            const weather = data.current_weather;
            const temp = Math.round(weather.temperature);
            const code = weather.weathercode;

            weatherBox.temp.textContent = `${temp}°C`;
            weatherBox.icon.textContent = getWeatherEmoji(code);

        } catch (e) {
            console.warn("Weather API error:", e);
            weatherBox.temp.textContent = "—°C";
            weatherBox.icon.textContent = "⛅";
        }
    }

    updateWeather();
    setInterval(updateWeather, 10 * 60 * 1000); // обновляем раз в 10 минут
}

function getWeatherEmoji(code) {
    // Open-Meteo weather codes → emoji
    if (code === 0) return "☀️"; // ясно
    if (code <= 3) return "⛅"; // переменная облачность
    if (code <= 45) return "🌫️"; // туман
    if (code <= 57) return "🌧️"; // морось
    if (code <= 67) return "🌧️"; // дождь
    if (code <= 77) return "❄️"; // снег
    if (code <= 82) return "🌧️"; // сильный дождь
    if (code <= 86) return "❄️"; // снег
    if (code <= 99) return "⛈️"; // гроза

    return "⛅";
}


