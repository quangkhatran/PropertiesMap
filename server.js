require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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

const compareRoutes =
  require('./routes/compare');

/* =========================
YOUTUBE API ROUTES
========================= */

app.use('/youtube', youtubeRoutes);

app.use('/real-estate', realEstateRoutes);

app.use('/compare-markets', compareRoutes);

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
        "Nhon Trach",
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

app.post('/translate-report', async (req,res)=>{

  try{

    const {
      overview,
      sentiment,
      pricing
    } = req.body;

    const prompt = `

Translate the following real estate market report
into natural professional Vietnamese.

OVERVIEW:
${overview}

SENTIMENT:
${sentiment}

PRICING:
${pricing}

Return ONLY valid JSON:

{
  "overview":"",
  "sentiment":"",
  "pricing":""
}

`;

    const completion =
      await openai.chat.completions.create({

        model:'gpt-4.1-mini',

        messages:[
          {
            role:'user',
            content:prompt
          }
        ],

        temperature:0.4

      });

    const text =
      completion.choices[0]
      .message.content;

    const cleaned =
      text
        .replace(/```json/g,'')
        .replace(/```/g,'')
        .trim();

    const json =
      JSON.parse(cleaned);

    res.json(json);

  }catch(err){

    console.log(err);

    res.status(500).json({
      error:'translate failed'
    });

  }

});

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

