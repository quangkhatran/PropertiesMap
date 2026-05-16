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

const {
  analyzeMarketSignals
} = require('../services/marketSignals');

const {
  detectHotspots
} = require('../services/hotspotDetector');

const {
  calculateInvestmentScore
} = require('../services/investmentScore');

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

    const signals =
      await analyzeMarketSignals({

        city,
        category,
        videos

      });

    const hotspots =
      detectHotspots(videos);

    const investmentScore =
      calculateInvestmentScore({

        infrastructure:
          signals.infrastructure.score,

        investmentMomentum:
          signals.investmentMomentum.score,

        speculativeHeat:
          signals.speculativeHeat.score,

        luxuryMigration:
          signals.luxuryMigration.score,

        marketMaturity:
          signals.marketMaturity.score

      });

    console.log("RAW INVESTMENT SCORE: " ,investmentScore);

    const report =
      await generateMarketReport({

        city,
        category,
        videos,
        listings,
        pricing,
        investmentScore

      });

    /* =========================
    CALCULATE AND SORT REAL ESTATE SCORES
    ========================= */

    videos.forEach(video => {
        video.realEstateScore = calculateRealEstateScore(video);
    });

    videos.sort((a,b)=> b.realEstateScore - a.realEstateScore);


    /* =========================
    RESPONSE
    ========================= */ 

    res.json({
        city,

        category,
        
        videos,
        
        listings,
        
        pricing,
        
        report,
        
        signals,
        
        hotspots,
        
        investmentScore
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