const {
  GoogleSearch
} = require(
  'google-search-results-nodejs'
);

const {
  extractPlaces
} = require('./ai');

const {
  getCache,
  setCache
} = require('../cache/cache');

const search =
  new GoogleSearch(
    process.env.SERPAPI_KEY
  );

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

function buildTikTokQueries(
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
  VIETNAM
  ========================= */

  if(isVietnam){

    const vnQueries = {

      cafes:[

        `site:tiktok.com quán cafe đẹp ở ${localCityName}`,

        `site:tiktok.com cafe chill ${localCityName}`,

        `site:tiktok.com review cafe ${localCityName}`

      ],

      restaurants:[

        `site:tiktok.com quán ăn ngon ở ${localCityName}`,

        `site:tiktok.com food review ${localCityName}`,

        `site:tiktok.com ăn gì ở ${localCityName}`

      ],

      nightlife:[

        `site:tiktok.com nightlife ${localCityName}`,

        `site:tiktok.com rooftop bar ${localCityName}`

      ],

      hotels:[

        `site:tiktok.com khách sạn đẹp ở ${localCityName}`,

        `site:tiktok.com review resort ${localCityName}`

      ],

      luxury:[

        `site:tiktok.com luxury lifestyle ${localCityName}`,

        `site:tiktok.com địa điểm sang trọng ở ${localCityName}`

      ],

      architecture:[

        `site:tiktok.com kiến trúc đẹp ở ${localCityName}`,

        `site:tiktok.com toà nhà đẹp ${localCityName}`

      ]

    };

    return (

      vnQueries[category]

      ||

      [

        `site:tiktok.com du lịch ${localCityName}`

      ]

    );

  }

  /* =========================
  INTERNATIONAL
  ========================= */

  const intlQueries = {

    cafes:[

      `site:tiktok.com best cafes in ${city}`,

      `site:tiktok.com hidden cafes in ${city}`

    ],

    restaurants:[

      `site:tiktok.com best restaurants in ${city}`,

      `site:tiktok.com where to eat in ${city}`

    ],

    nightlife:[

      `site:tiktok.com nightlife in ${city}`,

      `site:tiktok.com rooftop bars in ${city}`

    ],

    hotels:[

      `site:tiktok.com luxury hotels in ${city}`,

      `site:tiktok.com best hotels in ${city}`

    ],

    luxury:[

      `site:tiktok.com luxury lifestyle in ${city}`

    ],

    architecture:[

      `site:tiktok.com architecture in ${city}`,

      `site:tiktok.com iconic buildings in ${city}`

    ]

  };

  return (

    intlQueries[category]

    ||

    [

      `site:tiktok.com travel guide ${city}`

    ]

  );

}

/* =========================
TIKTOK SEARCH
========================= */

async function searchTikTok(
  city,
  category='cafes'
){

  const cacheKey =
    `tiktok-${city}-${category}`;

  const cached =
    getCache(cacheKey);

  if(cached){
    return cached;
  }

  return new Promise(async(resolve)=>{

    try{

      const queries =
        buildTikTokQueries(
          city,
          category
        );

      let allItems = [];

      /* =========================
      FETCH RESULTS
      ========================= */

      for(const q of queries){

        console.log(
          'TIKTOK QUERY:',
          q
        );

        await new Promise(done=>{

          search.json({

            q:q,

            num:8,

            engine:'google'

          },

          (data)=>{

            const results =
              data.organic_results || [];

            allItems.push(...results);

            done();

          });

        });

      }

      /* =========================
      REMOVE DUPLICATES
      ========================= */

      const uniqueMap = {};

      allItems.forEach(item=>{

        uniqueMap[
          item.link
        ] = item;

      });

      allItems =
        Object.values(uniqueMap);

      /* =========================
      AI EXTRACTION
      ========================= */

      const enriched =
        await Promise.all(

          allItems.map(
            async(item)=>{

              let places = [];

              try{

                places =
                  await extractPlaces(`

                    TITLE:
                    ${item.title || ''}

                    SNIPPET:
                    ${item.snippet || ''}

                  `);

              }catch(err){

                console.log(
                  err.message
                );

              }

              return {

                title:
                  item.title ||
                  'TikTok Discovery',

                creator:
                  'TikTok',

                thumbnail:

                  item.thumbnail ||

                  item.rich_snippet?.top?.extensions?.[0] ||

                  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200',

                image:

                  item.thumbnail ||

                  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200',

                url:
                  item.link ||

                  'https://tiktok.com',

                places,

                source:'tiktok'

              };

            }

          )

        );

      /* =========================
      CLEAN RESULTS
      ========================= */

      const cleaned =
        enriched.filter(item=>

          item.places &&
          item.places.length

        );

      console.log(
        'TOTAL TIKTOK RESULTS:',
        cleaned.length
      );

      setCache(
        cacheKey,
        cleaned
      );

      resolve(cleaned);

    }catch(err){

      console.log(
        err.response?.data ||
        err.message
      );

      resolve([]);

    }

  });

}

module.exports = {
  searchTikTok
};
