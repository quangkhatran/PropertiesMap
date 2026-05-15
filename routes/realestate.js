const express = require('express');

// const {
//   searchPlace
// } = require('../services/places');

const {
  searchYoutube
} = require('../services/youtube');

const {
  searchFacebook
} = require('../services/facebook');

// const {
//   searchTikTok
// } = require('../services/tiktok');

const {
  calculateRealEstateScore
} = require("../services/realEstateScoring");

const {
  realEstateCoordinates
} = require(
  '../data/realEstateCoordinates'
);

const {
  searchListings
} = require(
  '../services/listings'
);

const {
  analyzePricing
} = require(
  '../services/pricingAnalysis'
);

const {
  generateMarketReport
} = require('../services/marketReport');

const router = express.Router();

/* =========================
YOUTUBE + AI CITY SEARCH
========================= */

router.get('/:city', async(req,res)=>{

  try{

    const city =
      req.params.city;

    // Multi-category support

    const category =
      req.query.category ||
      'land';

    // Search YouTube

    const youtube =
      await searchYoutube(
        city,
        category,
        "real-estate"
      );

    const facebook =
      await searchFacebook(
        city,
        category,
        "real-estate"
      );
    
    // const tiktok =
    //   await searchTikTok(
    //   city,
    //   category,
    //   "real-estate"
    // );
    
    const videos = [
      ...youtube,
      ...facebook,
      // ...tiktok
    ];

    const listings = 
        await searchListings(
            city,
            category
        );

    const pricing =
        analyzePricing(
            listings
        );

    const report =
      await generateMarketReport({

        city,
        category,
        videos,
        listings,
        pricing

      });

    /* =========================
    CALCULATE AND SORT REAL ESTATE SCORES
    ========================= */

    videos.forEach(video => {
        video.realEstateScore = calculateRealEstateScore(video);
    });

    videos.sort((a,b)=> b.realEstateScore - a.realEstateScore);

    /* =========================
    AGGREGATE PLACE MENTIONS
    ========================= */

    // const mentionMap = {};

    // videos.forEach(video=>{
    //     (video.places || [])
    //         .forEach(place=>{

    //             if(!mentionMap[place]){
    //             mentionMap[place] = 0;
    //             }

    //             mentionMap[place]++;

    //         });  
    // });

    /* =========================
    SORT TOP PLACES
    ========================= */

    // const recommendations =
    //   Object.entries(mentionMap)
    //   .sort((a,b)=>b[1]-a[1])
    //   .slice(0,3);

    /* =========================
    GOOGLE PLACES ENRICHMENT
    ========================= */

    // const enrichedRecommendations =
    //   await Promise.all(

    //     recommendations.map(
    //       async([name,count])=>{

    //         try{

    //             const coords = realEstateCoordinates[name];

    //             return {

    //                 name,

    //                 mentions: count,

    //                 place:{

    //                     name,

    //                     address: city,

    //                     lat:
    //                     coords?.lat || null,

    //                     lng:
    //                     coords?.lng || null,

    //                     rating:null,

    //                     photos:

    //                     coords?.image

    //                     ?

    //                     [
    //                         {
    //                         photo_reference:
    //                             coords.image
    //                         }
    //                     ]

    //                     :

    //                     []

    //                 }

    //             };

    //         }catch(err){

    //             console.log(
    //                 'PLACE ERROR:',
    //                 err.response?.data ||
    //                 err.message
    //             );

    //             return {

    //                 name,
    //                 mentions:count,
    //                 place:null

    //             };

    //         }

    //       }

    //     )

    //   );

    /* =========================
    RESPONSE
    ========================= */

    res.json({

        city,
        category,

        videos,

        listings,

        pricing,

        report

    });

  }catch(err){

    console.log(
      err.response?.data ||
      err.message
    );

    res.status(500).json({

      error:'real estate failed'

    });

  }

});

module.exports = router;