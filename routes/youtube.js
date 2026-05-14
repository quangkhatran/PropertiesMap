const express = require('express');

const {
  searchPlace
} = require('../services/places');

const {
  searchYoutube
} = require('../services/youtube');

const {
  searchFacebook
} = require('../services/facebook');

// const {
//   searchTikTok
// } = require('../services/tiktok');

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
      'cafes';

    // Search YouTube

    const youtube =
      await searchYoutube(
        city,
        category,
        "lifestyle"
      );

    const facebook =
      await searchFacebook(
        city,
        category,
        "lifestyle"
      );
    
    // const tiktok =
    //   await searchTikTok(
    //   city,
    //   category,
    //   "lifestyle"
    // );
    
    const videos = [
      ...youtube,
      ...facebook,
      // ...tiktok
    ];

    /* =========================
    AGGREGATE PLACE MENTIONS
    ========================= */

    const mentionMap = {};

    videos.forEach(video=>{

      (video.places || [])
      .forEach(place=>{

        if(!mentionMap[place]){
          mentionMap[place] = 0;
        }

        mentionMap[place]++;

      });

    });

    /* =========================
    SORT TOP PLACES
    ========================= */

    const recommendations =
      Object.entries(mentionMap)
      .sort((a,b)=>b[1]-a[1])
      .slice(0,3);

    /* =========================
    GOOGLE PLACES ENRICHMENT
    ========================= */

    const enrichedRecommendations =
      await Promise.all(

        recommendations.map(
          async([name,count])=>{

            try{

              const firstPlace =
                await searchPlace(
                  name,
                  city
                );

              if(!firstPlace){

                return {

                  name,
                  mentions:count,
                  place:null

                };

              }

              return {

                name,

                mentions:count,

                place:{

                  name:
                    firstPlace.name,

                  address:
                    firstPlace.formatted_address,

                  lat:
                    firstPlace
                      .geometry
                      .location
                      .lat,

                  lng:
                    firstPlace
                      .geometry
                      .location
                      .lng,

                  rating:
                    firstPlace.rating,

                  photos:
                    firstPlace.photos || []

                }

              };

            }catch(err){

              console.log(
                'PLACE ERROR:',
                err.response?.data ||
                err.message
              );

              return {

                name,
                mentions:count,
                place:null

              };

            }

          }

        )

      );

    /* =========================
    RESPONSE
    ========================= */

    res.json({

      city,
      category,

      videos,

      recommendations:
        enrichedRecommendations

    });

  }catch(err){

    console.log(
      err.response?.data ||
      err.message
    );

    res.status(500).json({

      error:'youtube failed'

    });

  }

});

module.exports = router;