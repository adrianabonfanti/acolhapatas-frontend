const axios = require("axios");

const api = axios.create({
  baseURL: process.env.VITE_API_URL
});

console.log("URL da API:", process.env.VITE_API_URL);

module.exports = api;
