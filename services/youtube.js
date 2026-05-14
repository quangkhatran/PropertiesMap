const axios = require('axios');

const {
  extractPlaces
} = require('./ai');

const {
  getCache,
  setCache
} = require('../cache/cache');

/* =========================
LOCALIZED QUERY BUILDER
========================= */

const {

  isVietnamLocation,
  getVietnameseName,
  getSubregions

} = require('./geography');

function buildYoutubeQueries(
  city,
  category='cafes'
){

  const normalizedCity =
    city.toLowerCase();

  const isVietnam =
    isVietnamLocation(city);

  const localCityName =
    getVietnameseName(city);

  /* =========================
  VIETNAM QUERIES
  ========================= */

  if(isVietnam){
    const subregions =
      getSubregions(city);

    const vnQueries = {

      cafes:[

        `quán cafe đẹp ở ${localCityName}`,
        `cafe chill ${localCityName}`

      ],

      restaurants:[

        `quán ăn ngon ở ${localCityName}`,
        `food review ${localCityName}`

      ],

      nightlife:[

        `nightlife ${localCityName}`,
        `bar rooftop ${localCityName}`

      ],

      hotels:[

        `khách sạn đẹp ở ${localCityName}`,
        `review resort ${localCityName}`

      ],

      luxury:[

        `luxury lifestyle ${localCityName}`,
        `địa điểm sang trọng ở ${localCityName}`

      ],

      architecture:[

        `kiến trúc đẹp ở ${localCityName}`,
        `toà nhà đẹp ${localCityName}`

      ],

      land:[

        `đất nền ${localCityName}`,
        `bất động sản ${localCityName}`,
        `đầu tư ${localCityName}`,
        `quy hoạch ${localCityName}`,
        `hạ tầng ${localCityName}`,
        `cao tốc ${localCityName}`,
        `sân bay ${localCityName}`,
        `giá đất ${localCityName}`,

        ...subregions.map(
          region =>
            `đất nền ${region}`
        ),

        ...subregions.map(
          region =>
            `bất động sản ${region}`
        ),

        ...subregions.map(
          region =>
            `quy hoạch ${region}`
        )

      ],

      house:[

        `nhà đẹp ${localCityName}`,
        `chung cư ${localCityName}`,
        `apartment ${localCityName}`,
        `real estate ${localCityName}`,
        `housing market ${localCityName}`,

        ...subregions.map(
          region =>
            `căn hộ ${region}`
        ),

        ...subregions.map(
          region =>
            `nhà phố ${region}`
        ),

        ...subregions.map(
          region =>
            `apartment ${region}`
        )

      ],

      commercial:[

        `shophouse ${localCityName}`,
        `commercial real estate ${localCityName}`,
        `retail property ${localCityName}`,

        ...subregions.map(
          region =>
            `shophouse ${region}`
        ),

        ...subregions.map(
          region =>
            `commercial real estate ${region}`
        ),

        ...subregions.map(
          region =>
            `township ${region}`
        )

      ],

      industrial:[

        `khu công nghiệp ${localCityName}`,
        `industrial park ${localCityName}`,
        `factory investment ${localCityName}`,

        ...subregions.map(
          region =>
            `khu công nghiệp ${region}`
        ),

        ...subregions.map(
          region =>
            `industrial park ${region}`
        ),

        ...subregions.map(
          region =>
            `logistics ${region}`
        )

      ]

    };

    return (
      vnQueries[category]
      || []
    ).slice(0,3);

  }

  /* =========================
  INTERNATIONAL QUERIES
  ========================= */

  const intlQueries = {

    cafes:[

      `best cafes in ${city}`

    ],

    restaurants:[

      `best restaurants in ${city}`

    ],

    nightlife:[

      `best nightlife in ${city}`

    ],

    hotels:[

      `best hotels in ${city}`

    ],

    luxury:[

      `${city} luxury lifestyle`

    ],

    architecture:[

      `${city} architecture guide`

    ],

    land:[

      `land investment in ${city}`,
      `real estate opportunities in ${city}`,
      `infrastructure projects in ${city}`,
      `property hotspot ${city}`

    ],

    house:[

      `best apartments in ${city}`,
      `housing market ${city}`,
      `real estate in ${city}`

    ],

    commercial:[

      `commercial real estate ${city}`,
      `office investment ${city}`

    ],

    industrial:[

      `industrial real estate ${city}`,
      `industrial park ${city}`

    ]

  };

  return (

    intlQueries[category]

    ||

    [

      `travel guide ${city}`

    ]

  );

}

/* =========================
YOUTUBE SEARCH
========================= */

async function searchYoutube(
  city,
  category='cafes',
  mode='lifestyle'
){
    const cacheKey = `youtube-${mode}-${city}-${category}`;

    const cached = getCache(cacheKey);
    console.log("CACHED: ", cached);

    if(cached){
      return cached;
    }

    /* =========================
    BUILD QUERIES
    ========================= */

    const queries =
      buildYoutubeQueries(
        city,
        category
      );

    let allItems = [];

    /* =========================
    FETCH VIDEOS
    ========================= */

    for(const q of queries){

        console.log(
          'YOUTUBE QUERY:',
          q
        );

        try{

          const response =
            await axios.get(

              'https://www.googleapis.com/youtube/v3/search',

              {

                params:{

                  part:'snippet',

                  q:q,

                  maxResults:2,

                  type:'video',

                  key:
                    process.env
                    .YOUTUBE_API_KEY

                }

              }

            );

          if(
            response.data &&
            response.data.items
          ){

            allItems.push(
              ...response.data.items
            );

          }

        }catch(err){

          console.log(
            err.response?.data ||
            err.message
          );

        }

    }

    /* =========================
    REMOVE DUPLICATES
    ========================= */

    const uniqueMap = {};

    allItems.forEach(item=>{

      uniqueMap[
        item.id.videoId
      ] = item;

    });

    allItems =
      Object.values(uniqueMap);

    /* =========================
    AI PLACE EXTRACTION
    ========================= */

    const enriched =
      await Promise.all(

        allItems.map(
          async(item)=>{

            const title =
              item.snippet.title;

            const description =
              item.snippet.description;

            const combinedText = `

              TITLE:
              ${title}

              DESCRIPTION:
              ${description}

              CHANNEL:
              ${item.snippet.channelTitle}

            `;

            let extractedPlaces = [];

            try{

              extractedPlaces =
                await extractPlaces(
                  combinedText, 
                  mode 
                );

            }catch(err){

              console.log(
                'AI EXTRACT ERROR:',
                err.message
              );

            }

            
            return {

                title,

                creator:
                  item.snippet.channelTitle,

                thumbnail:
                  item.snippet
                  .thumbnails
                  .high
                  .url,

                videoId:
                  item.id.videoId,

                url:
                  `https://youtube.com/watch?v=${item.id.videoId}`,

                places:
                  extractedPlaces &&
                  extractedPlaces.length

                  ? extractedPlaces

                  : [],

                source:'youtube'

            };


          }

        )

    );

    /* =========================
    REMOVE EMPTY RESULTS
    ========================= */

    const cleaned =
      enriched.filter(item=>

        item.places &&
        item.places.length

      );

    console.log(
      'TOTAL VIDEOS:',
      cleaned.length
    );

    /* =========================
    SAVE CACHE
    ========================= */

    setCache(
      cacheKey,
      cleaned,
      60 * 60 * 24 * 7
    );

    return cleaned;

}

module.exports = {
  searchYoutube
};