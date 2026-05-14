const NodeCache = require("node-cache");

const cache = new NodeCache({
  stdTTL: 60 * 60 * 24 * 14,
  checkperiod: 120,
});

function getCache(key) {

  const data = cache.get(key);

  if (data) {
    console.log("CACHE HIT:", key);
  } else {
    console.log("CACHE MISS:", key);
  }

  return data;
}

function setCache(
  key,
  data,
  ttl = 60 * 60 * 24 * 14
) {

  cache.set(key, data, ttl);

  console.log("CACHE SAVED:", key);
}

function clearCache() {

  cache.flushAll();

  console.log("CACHE CLEARED");
}

module.exports = {
  getCache,
  setCache,
  clearCache
};