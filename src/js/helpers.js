import { async } from 'regenerator-runtime';
import { TIMEOUT_SEG } from './config.js';

//Garer to race promeses
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    // console.log(url);
    const resFetchPro = await Promise.race([fetch(url), timeout(TIMEOUT_SEG)]);

    const data = await resFetchPro.json();

    if (!resFetchPro.ok)
      throw new Error(`${data.message} (${resFetchPro.status})`);

    return data;
  } catch (error) {
    // console.log(error);
    // TODO: Here you passing or propagated or throwing the error throw the modules
    throw error;
  }
};

export const sendJson = async function (url, uploadDate) {
  try {
    // console.log(url);

    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(uploadDate),
    });

    const resFetchPro = await Promise.race([fetchPro, timeout(TIMEOUT_SEG)]);

    const data = await resFetchPro.json();

    if (!resFetchPro.ok)
      throw new Error(`${data.message} (${resFetchPro.status})`);

    return data;
  } catch (error) {
    // console.log(error);
    // TODO: Here you passing or propagated or throwing the error throw the modules
    throw error;
  }
};
