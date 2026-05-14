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

const {

  isVietnamLocation,
  getVietnameseName,
  getSubregions

} = require('./geography');

function buildTikTokQueries(
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
  VIETNAM
  ========================= */

  if(isVietnam){
    const subregions =
        getSubregions(city);
    
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

      ],

      land:[

        `site:tiktok.com đất nền ${localCityName}`,

        `site:tiktok.com bất động sản ${localCityName}`,

        `site:tiktok.com đầu tư đất ${localCityName}`,

        `site:tiktok.com quy hoạch ${localCityName}`,

        `site:tiktok.com hạ tầng ${localCityName}`,

        `site:tiktok.com sân bay ${localCityName}`,

        `site:tiktok.com cao tốc ${localCityName}`,

        ...subregions.map(
          region =>
            `site:tiktok.com đất nền ${region}`
        ),

        ...subregions.map(
          region =>
            `site:tiktok.com bất động sản ${region}`
        ),

        ...subregions.map(
          region =>
            `site:tiktok.com quy hoạch ${region}`
        )

      ],

      house:[

        `site:tiktok.com nhà phố ${localCityName}`,

        `site:tiktok.com căn hộ ${localCityName}`,

        `site:tiktok.com apartment ${localCityName}`,

        `site:tiktok.com housing market ${localCityName}`,

        ...subregions.map(
          region =>
            `site:tiktok.com căn hộ ${region}`
        ),

        ...subregions.map(
          region =>
            `site:tiktok.com nhà phố ${region}`
        ),

        ...subregions.map(
          region =>
            `site:tiktok.com apartment ${region}`
        )

      ],

      industrial:[

        `site:tiktok.com khu công nghiệp ${localCityName}`,

        `site:tiktok.com industrial park ${localCityName}`,

        `site:tiktok.com factory investment ${localCityName}`,

        ...subregions.map(
          region =>
            `site:tiktok.com khu công nghiệp ${region}`
        ),

        ...subregions.map(
          region =>
            `site:tiktok.com industrial park ${region}`
        ),

        ...subregions.map(
          region =>
            `site:tiktok.com logistics ${region}`
        )

      ],

      commercial:[

        `site:tiktok.com shophouse ${localCityName}`,

        `site:tiktok.com commercial real estate ${localCityName}`,

        ...subregions.map(
          region =>
            `site:tiktok.com shophouse ${region}`
        ),

        ...subregions.map(
          region =>
            `site:tiktok.com commercial real estate ${region}`
        ),

        ...subregions.map(
          region =>
            `site:tiktok.com township ${region}`
        )

      ],

      

    };

    return (
      vnQueries[category]
      || []
    ).slice(0,1);

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

    ],

    land:[

      `site:tiktok.com land investment in ${city}`,

      `site:tiktok.com real estate in ${city}`,

      `site:tiktok.com property market ${city}`,

      `site:tiktok.com infrastructure projects ${city}`,

      `site:tiktok.com urban development ${city}`

    ],

    house:[

      `site:tiktok.com houses in ${city}`,

      `site:tiktok.com apartments in ${city}`,

      `site:tiktok.com luxury homes ${city}`,

      `site:tiktok.com condo market ${city}`

    ],

    industrial:[

      `site:tiktok.com industrial park ${city}`,

      `site:tiktok.com logistics hub ${city}`,

      `site:tiktok.com manufacturing investment ${city}`

    ],

    commercial:[

      `site:tiktok.com commercial real estate ${city}`,

      `site:tiktok.com office market ${city}`,

      `site:tiktok.com mixed-use development ${city}`

    ],

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
  category='cafes',
  mode='lifestyle'
){

  const cacheKey = `tiktok-${mode}-${city}-${category}`;

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

                    `,

                    mode

                  );

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
        cleaned,
        60 * 60 * 24 * 14
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
