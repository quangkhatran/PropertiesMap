const express = require('express');

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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

router.post('/generate-compare-report', async (req, res) => {
  try{
    const { summary, markets, category } = req.body;

    const prompt = `
You are an AI real estate investment analyst.

Analyze the following real estate market comparison data.

Category:
${category}

Summary:
${JSON.stringify(summary, null, 2)}

Markets:
${JSON.stringify(markets, null, 2)}

Write a professional investment report in HTML format.
Write the report in BOTH English and Vietnamese.

Requirements:
- reportHtmlEn must be fully in English.
- reportHtmlVi must be a natural Vietnamese translation.
- Keep the same structure and insights in both languages.
- Use professional investment language.

IMPORTANT:
- Use only the provided data.
- Do not invent exact facts, dates, prices, or infrastructure projects unless already implied by market names.
- Explain WHY the top market has the highest score based on the metrics.
- Compare infrastructure, momentum, speculation, liquidity, maturity, population, GRDP, and tourism.
- Explain current market strengths and weaknesses.
- Then provide a 3–5 year future outlook.
- Mention that the forecast is a scenario, not a certainty.
- Return valid JSON only in this exact structure:

{
  "reportHtmlEn": "<h2>AI Market Report</h2>...",
  "reportHtmlVi": "<h2>Báo Cáo AI Thị Trường</h2>...",
  "forecast": [
    {
      "city": "Market Name",
      "futureScore": 8.5,
      "futureInfrastructure": 8,
      "futureMomentum": 8,
      "futureSpeculation": 7,
      "futureLiquidity": 7,
      "futureMaturity": 7,
      "futurePopulation": 8,
      "futureGRDP": 8,
      "futureTourism": 6
    }
  ],
  "futureWinner": "Market Name"
}

For every market, forecast all future fields: futureScore, futureInfrastructure, futureMomentum, futureSpeculation, futureLiquidity, futureMaturity, futurePopulation, futureGRDP, futureTourism.
All future values must be numbers from 0 to 10.
`;

    const completion = await openai.chat.completions.create({
      model:'gpt-4o-mini',
      messages:[
        {
          role:'system',
          content:'You are a precise real estate market analyst. Return JSON only.'
        },
        {
          role:'user',
          content:prompt
        }
      ],
      temperature:0.4,
      response_format:{
        type:'json_object'
      }
    });

    const result = JSON.parse(
      completion.choices[0].message.content
    );

    res.json(result);

  } catch(error){
    console.error(error);
    res.status(500).json({
      error:'Failed to generate compare report'
    });
  }
});

module.exports = router;