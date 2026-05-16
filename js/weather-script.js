const weatherContainer = document.getElementById("weather-container");

const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=40.42&longitude=-73&daily=wind_direction_10m_dominant,weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max,precipitation_sum&timezone=America%2FNew_York&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch";

function getCompassDirection(degrees) {
    const normalizedDegrees = (degrees % 360 + 360) % 360;
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(normalizedDegrees / 45) % 8;
    return directions[index];
}

fetch(apiUrl)

    .then(response => response.json())

    .then(data => {

        const dates = data.daily.time;

        const maxTemps = data.daily.temperature_2m_max;

        const minTemps = data.daily.temperature_2m_min;

        const maxWinds = data.daily.wind_speed_10m_max;

        const weatherCodes = data.daily.weather_code;

        const uvIndexes = data.daily.uv_index_max;

        const precipSums = data.daily.precipitation_sum;

        const windDirections = data.daily.wind_direction_10m_dominant;


        for (let i = 0; i < 7; i++) {

            const card = document.createElement("div");
            card.classList.add("card");

            const date = document.createElement("h2");
            date.textContent = dates[i];

            const dateObj = new Date(dates[i]);

            const longDate = dateObj.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            date.textContent = longDate;

            const maxTemp = document.createElement("p");
            maxTemp.textContent = "High: " + maxTemps[i] + "°F";

            const minTemp = document.createElement("p");
            minTemp.textContent = "Low: " + minTemps[i] + "°F";

            const compassDir = getCompassDirection(windDirections[i]);
            
            const maxWind = document.createElement("p");
            maxWind.textContent = `Wind from the ${compassDir} at ${maxWinds[i]} mph`;

            const weatherCode = document.createElement("p");
            weatherCode.textContent = "Weather Code: " + weatherCodes[i];

            const uvIndex = document.createElement("p");
            uvIndex.textContent = "UV Index: " + uvIndexes[i]

            const precipSum = document.createElement("p");
            precipSum.textContent = "Total Precipitation: " + precipSums[i] + " inch(es)"

            // const windDirection = document.createElement("p");
            // windDirection.textContent = "Wind Direction: " + windDirections[i]



            // Conditions Logic

            let imageFile = "sunny.jpg"; // default fallback

            if (weatherCodes[i] >= 0 && weatherCodes[i] <= 1) {
                imageFile = "sunny.jpg"
            }
            else if (weatherCodes[i] >= 50 && weatherCodes[i] <= 69 || weatherCodes[i] >= 80 && weatherCodes[i] <= 89) {
                imageFile = "rain.jpg"
            }
            else if (weatherCodes[i] === 71 || weatherCodes[i] === 73 || weatherCodes[i] === 75) {
                imageFile = "snow.jpg"
            }
            else if (weatherCodes[i] >= 40 && weatherCodes[i] <= 49) {
                imageFile = "fog.jpg"
            }

            // Wind Speed Logic

            let windImageFile = "/assets/light.png"

            if (maxWinds[i] < 10) {
                windImageFile = "/assets/light.png";
            } else if (maxWinds[i] < 20) {
                windImageFile = "/assets/moderate.png";
            } else if (maxWinds[i] < 40) {
                windImageFile = "/assets/strong.png";
            } else {
                windImageFile = "/assets/light.png";
            }


            const weatherImage = document.createElement("img");
            weatherImage.src = `/assets/${imageFile}`;
            weatherImage.classList.add("weather-icon");

            const windIcon = document.createElement("img");
            windIcon.src = windImageFile;
            windIcon.alt = "Wind strength icon";
            windIcon.classList.add("wind-icon");

            card.appendChild(weatherImage);

            card.appendChild(date);

            card.appendChild(maxTemp);

            card.appendChild(minTemp);

            // card.appendChild(weatherCode);

            card.appendChild(uvIndex);

            card.appendChild(precipSum);

            card.appendChild(maxWind);

            // card.appendChild(windDirection);

            card.appendChild(windIcon);

            weatherContainer.appendChild(card);

        }


    })
    

    .catch(error => {

        weatherContainer.innerHTML = "<p>Sorry, weather data could not be loaded.</p>";

        console.error("Error fetching weather data:", error);

    });