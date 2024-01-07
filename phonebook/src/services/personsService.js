const baseUrl = "http://localhost:3000/persons";
import axios from "axios";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (personObject) => {
  return axios.post(baseUrl, personObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};
export default { getAll, create, update, deletePerson };
