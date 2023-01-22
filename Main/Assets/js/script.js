const cityInputEl = document.querySelector('#city');
const inputFormEl = document.getElementById("input-form");
const todayData = [];
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
            todayData.push(temperature);


            const humidity = data.main.humidity;
            const humidityElement = document.getElementById('humidity');
            humidityElement.innerHTML = humidity + "%";
            todayData.push(humidity);

            const windSpeed = data.wind.speed;
            const windSpeedElement = document.getElementById('wind-speed');
            windSpeedElement.innerHTML = windSpeed + " MPH";
            todayData.push(windSpeed);

            getLatLonData(data.coord);

            function createButton(searchInput) {
                const searchHistoryButton = document.getElementById("city-list");
                const existingButtons = searchHistoryButton.getElementsByTagName("button");
                for (let i = 0; i < existingButtons.length; i++) {
                    if (existingButtons[i].innerHTML === searchInput) {
                        return;
                    }
                }

                const button = document.createElement("button");
                button.innerHTML = searchInput;
                searchHistoryButton.appendChild(button);
              }

            createButton(searchInput);

        })

                .catch(error => console.error(error))

                function createEntryButton() {
                    const button = document.createElement("button");
                    button.innerHTML = searchInput;
                    document.body.appendChild(button);
                  }


}

function getLatLonData(coord) {

    const latitude = coord.lat
    const longitude = coord.lon
    console.log(latitude, longitude);

    const forecastQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=71e8bde5a86d6d139c2bbca4d34ba268`

    fetch(forecastQueryUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
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
                        let windSpeed = data.list[i].wind.speed;
                        windSpeed = windSpeed * 2.237;
                        forecastWindSpeedData.push(windSpeed.toFixed(1));
                      }
                }
            }
            renderForecast(forecastTempData, forecastHumidityData, forecastWindSpeedData);
            appendDayOfWeek()


        });
}

function renderForecast(forecastTempData, forecastHumidityData, forecastWindSpeedData) {
    for (let i = 0; i < 5; i++) {
        document.querySelector(`.temperature${i}`).innerHTML = `Temperature: ${forecastTempData[i]} F`;
        document.querySelector(`.humidity${i}`).innerHTML = `Humidity: ${forecastHumidityData[i]} %`;
        document.querySelector(`.wind-speed${i}`).innerHTML = `Wind-Speed: ${forecastWindSpeedData[i]} MPH`;
    }
}

function appendDayOfWeek() {
    // Get the current date
    let currentDate = new Date();
    currentDate = currentDate + 1;
    let existingDays = []
    // Use a loop to iterate through each container-day element
    for (let i = 0; i < 5; i++) {
      // Use day.js to format the date
      let formattedDate = dayjs(currentDate).add(i+1, 'day').format('dddd');
      if(existingDays.includes(formattedDate)){
        return;
      }
      existingDays.push(formattedDate);
      // Get the container-day element
      let container = document.querySelector(`.container-day${i}`);

      // Create a new p element for the date
      let dateElement = document.createElement('h3');
      dateElement.classList.add('date');
      dateElement.innerText = formattedDate;

      // Append the date element to the container
      container.appendChild(dateElement);
    }
}




console.log(forecastTempData);
console.log(forecastHumidityData);
console.log(forecastWindSpeedData);

inputFormEl.addEventListener("submit", getCityData);
