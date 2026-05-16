const weatherContainer = document.getElementById("weather-container");

const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,uv_index_max,precipitation_sum,weather_code&timezone=America%2FNew_York&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch";

fetch(apiUrl)

    .then(response => response.json())

    .then(data => {

        const dates = data.daily.time;

        const maxTemps = data.daily.temperature_2m_max;

        const minTemps = data.daily.temperature_2m_min;

        const maxWinds = data.daily.wind_speed_10m_max;

        const weatherCodes = data.daily.weather_code;

        const uvIndexes = data.daily.uv_index_max;
        
        const precipSums= data.daily.precipitation_sum;

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

            const maxWind = document.createElement("p");
            maxWind.textContent = "Max Wind for the day: " + maxWinds[i] + " mph"

            const weatherCode = document.createElement("p");
            weatherCode.textContent = "Weather Code: " + weatherCodes[i];

            const uvIndex = document.createElement("p");
            uvIndex.textContent = "UV Index: " + uvIndexes[i]

            const precipSum = document.createElement("p");
            precipSum.textContent = "Total Precipitation: " + precipSums[i] + " inch(es)"
           
            card.appendChild(date);

            card.appendChild(maxTemp);

            card.appendChild(minTemp);

            card.appendChild(maxWind);

            card.appendChild(weatherCode);

            card.appendChild(uvIndex);

            card.appendChild(precipSum);

            weatherContainer.appendChild(card);

        }


    })

    .catch(error => {

        weatherContainer.innerHTML = "<p>Sorry, weather data could not be loaded.</p>";

        console.error("Error fetching weather data:", error);

    });