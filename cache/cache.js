const fs = require('fs');
const path = require('path');

const CACHE_DURATION =
  1000 * 60 * 60 * 6; // 6 hours

const CACHE_FILE =
  path.join(__dirname,'cache-data.json');

let cache = {};

/* =========================
LOAD CACHE FILE
========================= */

function loadCache(){

  try{

    if(fs.existsSync(CACHE_FILE)){

      const raw =
        fs.readFileSync(
          CACHE_FILE,
          'utf-8'
        );

      cache = JSON.parse(raw);

      console.log(
        'CACHE LOADED'
      );

    }

  }catch(err){

    console.log(
      'CACHE LOAD ERROR:',
      err.message
    );

  }

}

/* =========================
SAVE CACHE FILE
========================= */

function saveCache(){

  try{

    fs.writeFileSync(

      CACHE_FILE,

      JSON.stringify(
        cache,
        null,
        2
      )

    );

  }catch(err){

    console.log(
      'CACHE SAVE ERROR:',
      err.message
    );

  }

}

/* =========================
GET CACHE
========================= */

function getCache(key){

  const item = cache[key];

  if(!item) return null;

  const now = Date.now();

  const isExpired =

    now - item.timestamp
    >
    CACHE_DURATION;

  if(isExpired){

    console.log(
      'CACHE EXPIRED:',
      key
    );

    delete cache[key];

    saveCache();

    return null;

  }

  console.log(
    'CACHE HIT:',
    key
  );

  return item.data;

}

/* =========================
SET CACHE
========================= */

function setCache(
  key,
  data
){

  cache[key] = {

    timestamp:
      Date.now(),

    data

  };

  saveCache();

}

/* =========================
CLEAR CACHE
========================= */

function clearCache(){

  cache = {};

  saveCache();

}

/* =========================
EXPORTS
========================= */

loadCache();

module.exports = {

  getCache,
  setCache,
  clearCache

};