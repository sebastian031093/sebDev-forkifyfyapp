import { async } from 'regenerator-runtime';
import { TIMEOUT_SEG } from './config.js';
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
