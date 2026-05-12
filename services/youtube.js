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

const vietnamCities = [

  'da lat',
  'ho chi minh city',
  'saigon',
  'hanoi',
  'da nang',
  'hoi an',
  'nha trang',
  'phu quoc',
  'vung tau',
  'can tho',
  'ha long'

];

const cityAliases = {

  'ho chi minh city':'Sài Gòn',
  'saigon':'Sài Gòn',
  'da lat':'Đà Lạt',
  'hanoi':'Hà Nội',
  'da nang':'Đà Nẵng',
  'hoi an':'Hội An',
  'nha trang':'Nha Trang',
  'phu quoc':'Phú Quốc',
  'vung tau':'Vũng Tàu',
  'can tho':'Cần Thơ',
  'ha long':'Hạ Long'

};

function buildYoutubeQueries(
  city,
  category='cafes'
){

  const normalizedCity =
    city.toLowerCase();

  const isVietnam =
    vietnamCities.includes(
      normalizedCity
    );

  const localCityName =
    cityAliases[normalizedCity]
    || city;

  /* =========================
  VIETNAM QUERIES
  ========================= */

  if(isVietnam){

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

      ]

    };

    return (

      vnQueries[category]

      ||

      [

        `du lịch ${localCityName}`,
        `review ${localCityName}`

      ]

    );

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
  category='cafes'
){

    const cacheKey =
      `${city}-${category}`;

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
                  combinedText
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
      cleaned
    );

    return cleaned;

}

module.exports = {
  searchYoutube
};