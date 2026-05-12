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

const vietnamCities = [

  'da lat',
  'dalat',
  'ho chi minh city',
  'saigon',
  'hcm',
  'hanoi',
  'ha noi',
  'da nang',
  'hoi an',
  'nha trang',
  'phu quoc',
  'vung tau',
  'can tho',
  'ha long',
  'bien hoa'

];

const cityAliases = {

  'ho chi minh city':'Sài Gòn',
  'saigon':'Sài Gòn',
  'da lat':'Đà Lạt',
  'dalat':'Đà Lạt',
  'hanoi':'Hà Nội',
  'ha noi':'Hà Nội',
  'da nang':'Đà Nẵng',
  'hoi an':'Hội An',
  'nha trang':'Nha Trang',
  'phu quoc':'Phú Quốc',
  'vung tau':'Vũng Tàu',
  'can tho':'Cần Thơ',
  'ha long':'Hạ Long'

};

function buildFacebookQueries(
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

      ]

    };

    return (

      vnQueries[category]

      ||

      [

        `site:facebook.com du lịch ${localCityName}`

      ]

    );

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
  category='cafes'
){
  const cacheKey = `facebook-${city}-${category}`;
  
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

            num:5,

            tbm:'isch'

          },

          (data)=>{

            const images =
              data.images_results || [];

            allItems.push(...images);

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
          item.original ||
          item.link ||
          item.thumbnail
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

                    SOURCE:
                    ${item.source || ''}

                  `);

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

                thumbnail:
                  item.thumbnail ||

                  item.original ||

                  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200',

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
  searchFacebook
};