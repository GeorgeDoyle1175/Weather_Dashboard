const cityInputEl = document.querySelector('#city');
const inputFormEl = document.getElementById("input-form");
const forecastTempData = [];
const forecastHumidityData = [];
const forecastWindSpeedData = [];

console.log(inputFormEl);

function getCityData(event) {
    event.preventDefault();
    const searchInput = cityInputEl.value;
    console.log(cityInputEl.value);


    const localQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchInput + '&units=Imperial&appid=ffda50d2229e64d7f6563d9551b35ded'

    //console.log(localQueryUrl);
    //separate functions
    //Get Data for Current Weather//
    fetch(localQueryUrl)
        .then(response => response.json())

        .then(data => {
            console.log(data);

            const temperature = data.main.temp;
            const temperatureElement = document.getElementById('temperature');
            temperatureElement.innerHTML = temperature + "&#176;F";

            const humidity = data.main.humidity;
            const humidityElement = document.getElementById('humidity');
            humidityElement.innerHTML = humidity + "%";

            const windSpeed = data.wind.speed;
            const windSpeedElement = document.getElementById('wind-speed');
            windSpeedElement.innerHTML = windSpeed + " MPH";

            // // Get Data for Current Weather
            // const nextDay = dayjs().add(1, 'day').format("YYYY-MM-DD");

            // // filter the forecast data by next day
            // const forecast = data.list.filter(function(forecast) {
            //     return dayjs(forecast.dt_txt).format("YYYY-MM-DD") === nextDay;
            //   });

            // const nextDayForecast = forecast[0];
            // const forcastTemperature = nextDayForecast.main.temp;
            // const forcastHumidity = nextDayForecast.main.humidity;
            // const forcastWindSpeed = nextDayForecast.wind.speed;
            // console.log(`Temperature: ${forcastTemperature}`);
            // console.log(`Humidity: ${forcastHumidity}`);
            // console.log(`Wind Speed: ${forcastWindSpeed}`);
            getLatLonData(data.coord);

        })

        .catch(error => console.error(error))


}

function getLatLonData(coord) {

    const latitude = coord.lat
    const longitude = coord.lon
    console.log(latitude, longitude);

    const forecastQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=71e8bde5a86d6d139c2bbca4d34ba268`

    fetch(forecastQueryUrl)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.includes("12:00:00")) {
                    if (forecastTempData.length < 5) {

                        //Push next 5 days temp at 12pm into an empty array
                        let kelvinTemp = data.list[i].main.temp;
                        let fahrenheitTemp = (kelvinTemp - 273.15) * 9 / 5 + 32;
                        forecastTempData.push(fahrenheitTemp.toFixed(1))
                    }

                    if (forecastHumidityData.length < 5) {
                        //Push next 5 days humidity at 12pm into an empty array
                        forecastHumidityData.push(data.list[i].main.humidity);
                    }

                    if(forecastWindSpeedData.length < 5) {
                        //Push next 5 days wind speed at 12pm into an empty array
                        forecastWindSpeedData.push(data.list[i].wind.speed);
                      }
                }
            }
            renderForecast(forecastTempData, forecastHumidityData, forecastWindSpeedData);

        });
}

function renderForecast(forecastTempData, forecastHumidityData, forecastWindSpeedData) {
    for (let i = 0; i < 5; i++) {
        document.querySelector(`.temperature${i}`).innerHTML = `Temperature: ${forecastTempData[i]} F`;
        document.querySelector(`.humidity${i}`).innerHTML = `Humidity: ${forecastHumidityData[i]} %`;
        document.querySelector(`.wind-speed${i}`).innerHTML = `Wind-Speed: ${forecastWindSpeedData[i]} m/s`;
    }
}
console.log(forecastTempData);
console.log(forecastHumidityData);
console.log(forecastWindSpeedData);

inputFormEl.addEventListener("submit", getCityData);
