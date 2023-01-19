const cityInputEl = document.querySelector('#city');
const inputFormEl = document.getElementById("input-form");

console.log(inputFormEl);

function getCityData(event){
  event.preventDefault();
  const searchInput = cityInputEl.value;
  console.log(cityInputEl.value);


let localQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchInput + 'appid=71e8bde5a86d6d139c2bbca4d34ba268'

console.log(localQueryurl);

  fetch(localQueryUrl)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
}
inputFormEl.addEventListener("submit", getCityData);
