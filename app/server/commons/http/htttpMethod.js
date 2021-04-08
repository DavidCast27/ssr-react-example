const axios = require('axios');
const config = require('./httpConfig');

axios.default.baseURL = 'https://api.mercadolibre.com';

function getHttp(path, params = {}) {
  const json = Object.assign({}, { params }, config);
  return axios.get(`${path}`, json);
}

module.exports = {
  getHttp,
};
