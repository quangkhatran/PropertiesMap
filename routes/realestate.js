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

      let report =
        await generateMarketReport({

          city,
          category,
          videos,
          listings,
          pricing

        });

    function findScore(items = [], keywords = []){

      const found = items.find(item => {

        const name =
          (item.name || '').toLowerCase();

        return keywords.some(keyword =>
          name.includes(keyword)
        );

      });

      return Number(found?.score) || 0;

    }

    const enReport =
      report.en || {};

    const fundamentalSignals =
      enReport.fundamentalSignals || [];

    const marketDrivers =
      enReport.marketDrivers || [];

    const marketBehavior =
      enReport.marketBehavior || [];

    const investmentScore =
      calculateInvestmentScore({

        infrastructureExpansion:
          findScore(
            marketDrivers,
            ['infrastructure']
          ),

        urbanMigration:
          findScore(
            marketDrivers,
            ['urban', 'migration']
          ),

        industrialCorporateExpansion:
          findScore(
            marketDrivers,
            ['industrial', 'corporate']
          ),

        creditCapitalFlow:
          findScore(
            marketDrivers,
            ['credit', 'capital']
          ),

        investmentMomentum:
          findScore(
            marketBehavior,
            ['momentum']
          ),

        speculativeHeat:
          findScore(
            marketBehavior,
            ['speculative', 'speculation']
          ),

        liquidity:
          findScore(
            marketBehavior,
            ['liquidity']
          ),

        marketMaturity:
          findScore(
            marketBehavior,
            ['maturity']
          ),
        
        populationScale:
          findScore(
            fundamentalSignals,
            ['population']
          ),

        grdpStrength:
          findScore(
            fundamentalSignals,
            ['grdp']
          ),

        tourismDemand:
          findScore(
            fundamentalSignals,
            ['tourism']
          )

      });

    if(report.en){
      report.en.investmentScore =
        investmentScore;
    }

    if(report.vi){
      report.vi.investmentScore =
        investmentScore;
    }

    report.investmentScore =
      investmentScore;

    console.log(
      'FINAL INSTITUTIONAL SCORE:',
      investmentScore
    );

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