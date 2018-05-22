import axios from 'axios'

function getConfig (config) {
  config.method = config.method || 'get';
  const baseUrl = '/api/v1';
  config.url = config.url ? baseUrl + config.url : baseUrl;
  config.withCredentials = (config.withCredentials === undefined) ? true : config.withCredentials;
  return config
}

export default async function request(config = {}) {
  const { data } = await axios(getConfig(config));
  return data
}
