const cityInputEl = document.querySelector('#city');
const inputFormEl = document.getElementById("input-form");
const todayDataArray = [];
const forecastTempData = [];
const forecastHumidityData = [];
const forecastWindSpeedData = [];
const searchedCities = [];
//.includes

console.log(inputFormEl);

function getCityData(event) {
    event.preventDefault();
    let searchInput;
    //Checking if city button was clicked
    if (event.target.matches("button")) {
        searchInput = event.target.textContent;
        searchInput = formatString(searchInput);
    }
    //Checking if city has already been search whether to create a new button
    else {
        searchInput = cityInputEl.value;
        searchInput = formatString(searchInput);
        cityInputEl.value = "";
    }

    const localQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchInput + '&units=Imperial&appid=ffda50d2229e64d7f6563d9551b35ded'

    //console.log(localQueryUrl);
    //separate functions
    //Get Data for Current Weather//
    fetch(localQueryUrl)
        .then(response => response.json())

        .then(data => {
            if (!data.main) {
                alert("Invalid City Entered");
                return false;
            }

            const temperature = data.main.temp;
            const temperatureElement = document.getElementById('temperature');
            temperatureElement.innerHTML = temperature + "&#176;F";
            todayDataArray.push(temperature);


            const humidity = data.main.humidity;
            const humidityElement = document.getElementById('humidity');
            humidityElement.innerHTML = humidity + "%";
            todayDataArray.push(humidity);

            const windSpeed = data.wind.speed;
            const windSpeedElement = document.getElementById('wind-speed');
            windSpeedElement.innerHTML = windSpeed + " MPH";
            todayDataArray.push(windSpeed);

            getLatLonData(data.coord);
            createEntryButton();
            pushToLocalStorage(todayData, searchInput);

        })

        .catch(error => console.error(error))

    function createEntryButton() {
        if (!searchedCities.includes(searchInput)) {
            searchedCities.push(searchInput);
            const button = document.createElement("button");
            button.innerHTML = searchInput;
            document.body.appendChild(button);
            button.addEventListener("click", getCityData);
        }
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

                    if (forecastWindSpeedData.length < 5) {
                        //Push next 5 days wind speed at 12pm into an empty array
                        let windSpeed = data.list[i].wind.speed;
                        windSpeed = windSpeed * 2.237;
                        forecastWindSpeedData.push(windSpeed.toFixed(1));
                    }
                }
                renderForecast(forecastTempData, forecastHumidityData, forecastWindSpeedData);
            }
            appendDayOfWeek();
            forecastTempData.length = 0;
            forecastHumidityData.length = 0;
            forecastWindSpeedData.length = 0;

        });
}

function renderForecast(forecastTempData, forecastHumidityData, forecastWindSpeedData) {
    localStorage.setItem("forecastTempData", JSON.stringify(forecastTempData));
    localStorage.setItem("forecastHumidityData", JSON.stringify(forecastHumidityData));
    localStorage.setItem("forecastWindSpeedData", JSON.stringify(forecastWindSpeedData));
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
        let formattedDate = dayjs(currentDate).add(i + 1, 'day').format('dddd');

        // Get the container-day element
        let container = document.querySelector(`.container-day${i}`);
        let dateElement = container.querySelector('.date');

        if (dateElement) {
            dateElement.innerText = formattedDate;
        } else {
            dateElement = document.createElement('h3');
            dateElement.classList.add('date');
            dateElement.innerText = formattedDate;
            container.appendChild(dateElement);
        }
    }
}


function pushToLocalStorage(array, data) {
    // Convert the array to a string
    const todaysData = JSON.stringify(array);

    // Set the string to local storage with the key "data"
    localStorage.setItem(data, arrayString);
}

var formatString = function(str) {
    var result = [];
    var words = str.split(" ");

    for (var i = 0; i < words.length; i++) {
      var word = words[i].split("");

      word[0] = word[0].toUpperCase();

      result.push(word.join(""));
    }
    return result.join(" ");
  };

console.log(forecastTempData);
console.log(forecastHumidityData);
console.log(forecastWindSpeedData);

inputFormEl.addEventListener("submit", getCityData);
