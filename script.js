const apiKey = '409573755cbdcc87cb634eb14eaa9753';  // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const dateEl = document.getElementById('date');
const tempEl = document.getElementById('temp');
const descEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

const formatDate = (d) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
};

const fetchWeather = async (city) => {
  try {
    errorMessage.textContent = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod !== 200) {
      throw new Error(data.message);
    }
    displayWeather(data);
  } catch (err) {
    weatherInfo.style.display = 'none';
    errorMessage.textContent = err.message;
  }
};

const displayWeather = (data) => {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  dateEl.textContent = formatDate(new Date());
  tempEl.textContent = `${Math.round(data.main.temp)}°C`;
  descEl.textContent = data.weather[0].description;
  humidityEl.textContent = data.main.humidity;
  windEl.textContent = data.wind.speed;
  errorMessage.textContent = '';
  weatherInfo.style.display = 'block';
};

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

// Optional: trigger search on Enter key
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});
