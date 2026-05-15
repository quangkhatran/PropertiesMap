const {
  GoogleSearch
} = require(
  'google-search-results-nodejs'
);

const {
  getCache,
  setCache
} = require('../cache/cache');

const {
  extractPlaces
} = require('./ai');

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

function buildFacebookQueries(
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

        `site:facebook.com quán cafe đẹp ở ${localCityName}`,

        `site:facebook.com cafe chill ${localCityName}`,

        `site:facebook.com review cafe ${localCityName}`

      ],

      restaurants:[

        `site:facebook.com quán ăn ngon ở ${localCityName}`,

        `site:facebook.com food review ${localCityName}`,

        `site:facebook.com ăn gì ở ${localCityName}`

      ],

      nightlife:[

        `site:facebook.com nightlife ${localCityName}`,

        `site:facebook.com rooftop bar ${localCityName}`

      ],

      hotels:[

        `site:facebook.com khách sạn đẹp ở ${localCityName}`,

        `site:facebook.com review resort ${localCityName}`

      ],

      luxury:[

        `site:facebook.com luxury lifestyle ${localCityName}`,

        `site:facebook.com địa điểm sang trọng ở ${localCityName}`

      ],

      architecture:[

        `site:facebook.com kiến trúc đẹp ở ${localCityName}`,

        `site:facebook.com toà nhà đẹp ${localCityName}`

      ],

      land:[

        `site:facebook.com đất nền ${localCityName}`,
        `site:facebook.com bất động sản ${localCityName}`,
        `site:facebook.com đầu tư ${localCityName}`,
        `site:facebook.com quy hoạch ${localCityName}`,
        `site:facebook.com hạ tầng ${localCityName}`,
        `site:facebook.com cao tốc ${localCityName}`,
        `site:facebook.com sân bay ${localCityName}`,
        `site:facebook.com giá đất ${localCityName}`,

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

        `site:facebook.com nhà phố ${localCityName}`,

        `site:facebook.com căn hộ ${localCityName}`,

        `site:facebook.com apartment ${localCityName}`,

        ...subregions.map(
          region =>
            `site:facebook.com căn hộ ${region}`
        ),

        ...subregions.map(
          region =>
            `site:facebook.com apartment ${region}`
        ),

        ...subregions.map(
          region =>
            `site:facebook.com nhà phố ${region}`
        )

      ],

      industrial:[

        `site:facebook.com khu công nghiệp ${localCityName}`,

        `site:facebook.com industrial park ${localCityName}`,

        ...subregions.map(
          region =>
            `site:facebook.com khu công nghiệp ${region}`
        ),

        ...subregions.map(
          region =>
            `site:facebook.com industrial park ${region}`
        ),

        ...subregions.map(
          region =>
            `site:facebook.com logistics ${region}`
        )

      ],

      commercial:[

        `site:facebook.com shophouse ${localCityName}`,

        `site:facebook.com commercial real estate ${localCityName}`,

        ...subregions.map(
          region =>
            `site:facebook.com shophouse ${region}`
        ),

        ...subregions.map(
          region =>
            `site:facebook.com commercial real estate ${region}`
        ),

        ...subregions.map(
          region =>
            `site:facebook.com township ${region}`
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

      `site:facebook.com best cafes in ${city}`,

      `site:facebook.com hidden cafes in ${city}`,

      `site:facebook.com cafe recommendations ${city}`

    ],

    restaurants:[

      `site:facebook.com best restaurants in ${city}`,

      `site:facebook.com food recommendations ${city}`,

      `site:facebook.com where to eat in ${city}`

    ],

    nightlife:[

      `site:facebook.com nightlife in ${city}`,

      `site:facebook.com rooftop bars in ${city}`

    ],

    hotels:[

      `site:facebook.com luxury hotels in ${city}`,

      `site:facebook.com best hotels in ${city}`

    ],

    luxury:[

      `site:facebook.com luxury lifestyle in ${city}`

    ],

    architecture:[

      `site:facebook.com architecture in ${city}`,

      `site:facebook.com iconic buildings in ${city}`

    ],

    land:[

      `site:facebook.com real estate ${city}`,

      `site:facebook.com land investment ${city}`,

      `site:facebook.com infrastructure ${city}`

    ],

    house:[

      `site:facebook.com apartments ${city}`,

      `site:facebook.com housing market ${city}`

    ],

    industrial:[

      `site:facebook.com industrial real estate ${city}`

    ],

    commercial:[

      `site:facebook.com office market ${city}`

    ]

  };

  return (

    intlQueries[category]

    ||

    [

      `site:facebook.com travel guide ${city}`

    ]

  );

}

/* =========================
FACEBOOK SEARCH
========================= */

async function searchFacebook(
  city,
  category='cafes',
  mode='lifestyle'
){
  const cacheKey = `facebook-${mode}-${city}-${category}`;;
  
  const cached = getCache(cacheKey);

  if(cached){
    return cached;
  }

  return new Promise(async(resolve)=>{

    try{

      const queries =
        buildFacebookQueries(
          city,
          category
        );

      let allItems = [];

      /* =========================
      FETCH RESULTS
      ========================= */

      for(const q of queries){

        console.log(
          'FACEBOOK QUERY:',
          q
        );

        await new Promise(done=>{

          search.json({

            q:q,

            num:3,

            // tbm:'isch'
            engine:'google'

          },

          (data)=>{

            // const images =
            //   data.images_results || [];
            const results =
                data.organic_results || [];

            // allItems.push(...images);
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

        // uniqueMap[
        //   item.original ||
        //   item.link ||
        //   item.thumbnail
        // ] = item;
        
        uniqueMap[
          item.link ||
          item.title
        ] = item;

      });

      allItems =
        Object.values(uniqueMap);

      /* =========================
      AI EXTRACTION
      ========================= */

      const enriched =
        await Promise.all(

          allItems.slice(0,2).map(
            async(item)=>{

              let places = [];

              try{

                places =
                  await extractPlaces(`

                      TITLE:
                      ${item.title || ''}

                      SOURCE:
                      ${item.source || ''}

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
                  'Facebook Discovery',

                creator:
                  'Facebook',

                // thumbnail:
                //   item.thumbnail ||

                //   item.original ||

                //   'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200',
                thumbnail:
                    item.thumbnail ||

                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',

                image:
                  item.original ||

                  item.thumbnail ||

                  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200',

                url:
                  item.original ||

                  item.link ||

                  'https://facebook.com',

                places,

                source:'facebook'

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
        'TOTAL FACEBOOK RESULTS:',
        cleaned.length
      );

      setCache(
        cacheKey,
        cleaned,
        60 * 60 * 24 * 30
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
  searchFacebook
};