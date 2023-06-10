import axios from 'axios';

/** get server data */
export async function getServerData(url, callback) {
  const data = await (await axios.get(url))?.data;
  console.log(data);

  return callback ? callback(data) : data;
}

/** post server data */
export async function postServerData(url, result, callback) {
  const data = await (await axios.post(url, result))?.data;
  return callback ? callback(data) : data;
}
