require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const youtubeRoutes =
  require('./routes/youtube');

  const realEstateRoutes =
  require('./routes/realestate');

const app = express();

app.use(cors());

app.use(express.json());

const {
  searchYoutube
} = require('./services/youtube');

const {
  searchFacebook
} = require('./services/facebook');

const {
  searchTikTok
} = require('./services/tiktok');

/* =========================
YOUTUBE API ROUTES
========================= */

app.use('/youtube', youtubeRoutes);

app.use('/real-estate', realEstateRoutes);

/* =========================
STATIC FILES
========================= */

app.use(
  express.static(
    path.join(__dirname,'public')
  )
);

/* =========================
HEALTH CHECK
========================= */

app.get('/health',(req,res)=>{

  res.json({
    status:'ok',
    server:'running'
  });

});

/* =========================
MULTI CATEGORY SUPPORT
========================= */

app.get('/api/categories',(req,res)=>{

  res.json({

  lifestyle:[

    'cafes',
    'restaurants',
    'nightlife',
    'luxury',
    'hotels',
    'architecture'

  ],

  realEstate:[

    'land',
    'house',
    'industrial',
    'commercial'

  ]

});

});

async function preloadHotCities(){

  const hotSearches = [

    {
      city:'Da Lat',
      category:'cafes'
    },

    // {
    //   city:'Ho Chi Minh City',
    //   category:'restaurants'
    // },

    // {
    //   city:'London',
    //   category:'luxury'
    // }

  ];

  for(const item of hotSearches){

    try{

      console.log(
        'PRELOADING:',
        item.city,
        item.category
      );

      await searchYoutube(
        item.city,
        item.category,
        "lifestyle"
      );

      // await searchFacebook(
      //   item.city,
      //   item.category,
      //   "lifestyle"
      // );

      // await searchTikTok(
      //   item.city,
      //   item.category,
      //   "lifestyle"
      // );

    }catch(err){

      console.log(
        err.message
      );

    }

  }

  try {

    await searchYoutube(
        "Dong Nai",
        "land",
        "real-estate"
    );

    // await searchFacebook(
    //   "Dong Nai",
    //   "land",
    //   "real-estate"
    // );

    // await searchTikTok(
    //   "Dong Nai",
    //   "land",
    //   "real-estate"
    // );

  } catch(err) {

      console.log(
        err.message
      );

  }

}

/* =========================
START SERVER
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{

  console.log(
    `Server running on ${PORT}`
  );

});

preloadHotCities();

