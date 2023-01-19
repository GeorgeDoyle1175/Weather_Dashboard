const cityInputEl = document.querySelector('#city');
const inputFormEl = document.getElementById("input-form");

console.log(inputFormEl);

function getCityData(event){
  event.preventDefault();
  const searchInput = cityInputEl.value;
  console.log(cityInputEl.value);


let localQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchInput + '&units=Imperial&appid=71e8bde5a86d6d139c2bbca4d34ba268'

console.log(localQueryUrl);

  fetch(localQueryUrl)
  .then(response => response.json())

  .then(data => {
    const temperature = data.main.temp;
    const temperatureElement = document.getElementById('temperature');
    temperatureElement.innerHTML = temperature + " F";

    const humidity = data.main.humidity;
    const humidityElement = document.getElementById('humidity');
    humidityElement.innerHTML = humidity;

    const windSpeed = data.wind.speed;
    const windSpeedElement = document.getElementById('wind-speed');
    windSpeedElement.innerHTML = windSpeed + " mph";
  })

  .catch(error => console.error(error))
}
inputFormEl.addEventListener("submit", getCityData);
