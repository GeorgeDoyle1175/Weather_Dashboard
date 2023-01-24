<img width="1394" alt="Screen Shot 2023-01-23 at 6 44 19 PM" src="https://user-images.githubusercontent.com/119374026/214177251-cee5226c-3d5e-4513-9e02-9ea7dd0ca8c2.png">
# Weather_Dashboard

This is an HTML code that creates a weather dashboard web page. The page has a form that allows the user to search for a city's weather data by typing in the city's name or clicking on a previously searched city's button. The JavaScript code uses the OpenWeatherMap API to fetch the data, which is then displayed on the page and stored in local storage. The code also fetches forecast data for the next five days and displays it on the page.

## Getting Started
The HTML uses the following elements:

* header element to display the title of the page "Weather Dashboard"
* form element is used to take the input of the city name and search button
 * div elements with the id's "current-conditions", "forecast", and "search-history" are used to display the current weather conditions, five-day forecast, and search history of the cities that have been searched.
* script elements at the bottom of the page are used to link the JavaScript code that handles the functionality of the page and the library dayjs.
 * The CSS file is used to add styles to the page.

The JavaScript code uses the following variables:

 * cityInputEl: A reference to the city input element on the page
 * inputFormEl: A reference to the input form element on the page
 * todayDataArray:An array to store the data for the current day's weather
 * forecastTempData, forecastHumidityData, forecastWindSpeedData: Arrays to store the forecast data for temperature, humidity, and wind speed, respectively
 * searchedCities: An array to store the names of the cities that have been searched

 ## Functionality
The main function in the code is getCityData(). It is called when the user submits the form or clicks on a previously searched city's button. The function does the following:

* prevents the default form submission behavior
* gets the city name from the input field or the button's text content
* creates a URL to fetch data from the OpenWeatherMap API
* fetches the data and displays it on the page
* calls the getLatLonData() function to fetch the forecast data
* creates a button for the searched city if it has not been searched before
* stores the data in local storage using the pushToLocalStorage() function
* The getLatLonData() function does the following:

* gets the latitude and longitude of the city from the data fetched by the getCityData() function
* creates a URL to fetch forecast data from the OpenWeatherMap API
* fetches the forecast data and stores the temperature, humidity, and wind speed in their respective arrays
* Local Storage
* The code uses the localStorage API to store the data for the current day's weather and the city name as key. This allows the user to access the data even after the page is closed or refreshed.
