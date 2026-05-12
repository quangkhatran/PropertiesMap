require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const youtubeRoutes =
  require('./routes/youtube');

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

  res.json([
    'cafes',
    'restaurants',
    'nightlife',
    'luxury',
    'hotels',
    'architecture'
  ]);

});

async function preloadHotCities(){

  const hotSearches = [

    {
      city:'Da Lat',
      category:'cafes'
    },

    {
      city:'Ho Chi Minh City',
      category:'restaurants'
    },

    {
      city:'London',
      category:'luxury'
    }

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
        item.category
      );

      await searchFacebook(
        item.city,
        item.category
      );

      await searchTikTok(
        item.city,
        item.category
      );

    }catch(err){

      console.log(
        err.message
      );

    }

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

