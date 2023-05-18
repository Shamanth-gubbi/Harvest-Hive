const axios = require('axios');

const apiKey = '';
const city = 'Bengaluru';
const country = 'India';

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

axios.get(apiUrl)
  .then(response => {
    const weatherData = response.data;
    const rainfall = weatherData.rain ? weatherData.rain['1h'] : 0; // Rainfall in the last hour
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    console.log(`Soil type: ${soilType}`);
    console.log(`Rainfall (last hour): ${rainfall} mm`);
    console.log(`Temperature: ${temperature} Kelvin`);
    console.log(`Humidity: ${humidity}%`);
  })
  .catch(error => {
    console.log(error);
  });
