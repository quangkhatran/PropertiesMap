const express = require('express');

const {
  searchYoutube
} = require('../services/youtube');

const {
  searchFacebook
} = require('../services/facebook');

const {
  searchListings
} = require('../services/listings');

const {
  analyzePricing
} = require('../services/pricingAnalysis');

const {
  generateMarketReport
} = require('../services/marketReport');

const {
  calculateInvestmentScore
} = require('../services/investmentScore');

const {
  buildMarketSnapshot,
  compareMarkets
} = require('../services/compareMarkets');

const router = express.Router();

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

async function getMarketData(city, category){

  const youtube =
    await searchYoutube(
      city,
      category,
      'real-estate'
    );

  const facebook =
    await searchFacebook(
      city,
      category,
      'real-estate'
    );

  const videos = [
    ...youtube,
    ...facebook
  ];

  const listings =
    await searchListings(city, category);

  const pricing =
    analyzePricing(listings);

  let report =
    await generateMarketReport({
      city,
      category,
      videos,
      listings,
      pricing
    });

  const fundamentalSignals =
    report?.en?.fundamentalSignals || [];

  const marketDrivers =
    report?.en?.marketDrivers || [];

  const marketBehavior =
    report?.en?.marketBehavior || [];

  const investmentScore =
    calculateInvestmentScore({

      infrastructureExpansion:
        findScore(marketDrivers, ['infrastructure']),

      urbanMigration:
        findScore(marketDrivers, ['urban', 'migration']),

      industrialCorporateExpansion:
        findScore(marketDrivers, ['industrial', 'corporate']),

      creditCapitalFlow:
        findScore(marketDrivers, ['credit', 'capital']),

      investmentMomentum:
        findScore(marketBehavior, ['momentum']),

      speculativeHeat:
        findScore(marketBehavior, ['speculative', 'speculation']),

      liquidity:
        findScore(marketBehavior, ['liquidity']),

      marketMaturity:
        findScore(marketBehavior, ['maturity']),
      
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
    report.en.investmentScore = investmentScore;
  }

  if(report.vi){
    report.vi.investmentScore = investmentScore;
  }

  report.investmentScore = investmentScore;

  return {
    city,
    category,
    videos,
    listings,
    pricing,
    report,
    investmentScore
  };
}

router.post('/', async(req,res)=>{

  try{

    const cities =
      req.body.cities || [];

    const category =
      req.body.category || 'land';

    if(!cities.length){
      return res.status(400).json({
        error:'cities required'
      });
    }

    const results =
      await Promise.all(
        cities.map(city =>
          getMarketData(city, category)
        )
      );

    const snapshots =
      results.map(buildMarketSnapshot);

    const comparison =
      compareMarkets(snapshots);

    res.json({
      category,
      comparison
    });

  }catch(err){

    console.log(
      err.response?.data ||
      err.message
    );

    res.status(500).json({
      error:'compare markets failed'
    });

  }

});

module.exports = router;