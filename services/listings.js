const {
  GoogleSearch
} = require(
  'google-search-results-nodejs'
);

const {
  isVietnamLocation,
  getVietnameseName,
  getSubregions
} = require('./geography');

const listingSources =
  require('./listingSources');

const search =
  new GoogleSearch(
    process.env.SERPAPI_KEY
  );

function buildListingQueries(
  city,
  category='land'
){

  const isVietnam =
    isVietnamLocation(city);

  const localCityName =
    getVietnameseName(city);

  const subregions =
    getSubregions(city);

  /* =========================
  VIETNAM
  ========================= */

  if(isVietnam){

    const vnQueries = {

      land:[

        `site:batdongsan.com.vn đất nền ${localCityName}`,

        `site:chotot.com đất ${localCityName}`,

        `site:mogi.vn đất ${localCityName}`,

        ...subregions.map(
          region =>
            `site:batdongsan.com.vn đất nền ${region}`
        ),

        ...subregions.map(
          region =>
            `site:chotot.com đất ${region}`
        )

      ],

      house:[

        `site:batdongsan.com.vn căn hộ ${localCityName}`,

        `site:batdongsan.com.vn nhà phố ${localCityName}`,

        `site:mogi.vn apartment ${localCityName}`,

        ...subregions.map(
          region =>
            `site:batdongsan.com.vn căn hộ ${region}`
        )

      ],

      industrial:[

        `site:batdongsan.com.vn khu công nghiệp ${localCityName}`,

        `site:cafeland.vn logistics ${localCityName}`,

        ...subregions.map(
          region =>
            `site:batdongsan.com.vn khu công nghiệp ${region}`
        )

      ],

      commercial:[

        `site:batdongsan.com.vn shophouse ${localCityName}`,

        `site:mogi.vn commercial real estate ${localCityName}`,

        ...subregions.map(
          region =>
            `site:batdongsan.com.vn shophouse ${region}`
        )

      ]

    };

    return (
      vnQueries[category]
      || vnQueries.land
    ).slice(0,3);

  }

  /* =========================
  INTERNATIONAL
  ========================= */

  return [

    `real estate ${city}`,

    `property market ${city}`,

    `apartments in ${city}`

  ];

}

async function searchListings(
  city,
  category='land'
){

  const queries =
    buildListingQueries(
      city,
      category
    );

  const results = [];

  for(const query of queries){

    try{

      const data =
        await new Promise(
          (resolve,reject)=>{

            search.json({

              q:query,

              engine:'google',

              num:5

            },

            (json)=>{

              resolve(json);

            });

          }
        );

      const organic =
        data.organic_results || [];

      organic.forEach(item=>{

        results.push({

          title:
            item.title,

          snippet:
            item.snippet,

          link:
            item.link,

          source:'listing'

        });

      });

    }catch(err){

      console.log(
        err.message
      );

    }

  }

  return results;

}

module.exports = {
  searchListings
};