const axios = require('axios');

const {
  getCache,
  setCache
} = require('../cache/cache');

async function searchPlace(
  query,
  city=''
){
  const cacheKey = `place-${query}-${city}`;
  const cached = getCache(cacheKey);

  if(cached){
    return cached;
  }

  try{

    const response =
      await axios.get(

        'https://maps.googleapis.com/maps/api/place/textsearch/json',

        {

          params:{

            query:
              `${query} ${city}`,

            key:
              process.env
              .GOOGLE_API_KEY

          }

        }

      );

    const result = response.data.results[0] || null;
    
    setCache(
      cacheKey,
      result,
      60 * 60 * 24 * 30
    );

    return (
      response.data.results &&
      response.data.results[0]
    )

    ||

    null;

  }catch(err){

    console.log(
      err.response?.data ||
      err.message
    );

    return null;

  }

}

module.exports = {
  searchPlace
};