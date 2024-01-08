import axios from "axios";
const api_key = import.meta.env.VITE_API_KEY;

const getWeather = (lat, lon) => {
  return axios.get(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${api_key}`
  );
};

export default { getWeather };
