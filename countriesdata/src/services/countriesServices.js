import axios from "axios";

const getAllCountries = () => {
  return axios.get("https://studies.cs.helsinki.fi/restcountries/api/all");
};

//
const searchCountry = (country) => {
  return axios.get(
    `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`
  );
};

export default { getAllCountries, searchCountry };
