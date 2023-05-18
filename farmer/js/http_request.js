const apiUrl = 'https://api.oceandrivers.com/v1.0/getAemetStation/aeropuertopalma/lastdata/';

axios.get(apiUrl)
  .then(response => {
    const dataContainer = document.getElementById('data-container');
    const responseData = response.data;

    const temp = responseData.TEMPERATURE;
    const humidity = responseData.HUMIDITY;
    const pressure = responseData.PRESSURE;
    const rain = responseData.RAIN;

    dataContainer.innerHTML = `
      <p>Temperature: ${temp} &deg;C</p>
      <p>Humidity: ${humidity} %</p>
      <p>Pressure: ${pressure} hPa</p>
      <p>Rain: ${rain} mm</p>
    `;
  })
  .catch(error => {
    console.error(error);
  });
