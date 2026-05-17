function getAverage(values = []){

  const nums =
    values.filter(v =>
      typeof v === 'number' &&
      !Number.isNaN(v)
    );

  if(!nums.length) return 0;

  return nums.reduce((a,b)=>a+b,0) / nums.length;
}

function getScore(report, section, keyword){

  const items =
    report?.en?.[section] || [];

  const found =
    items.find(item =>
      (item.name || '')
        .toLowerCase()
        .includes(keyword)
    );

  return Number(found?.score) || 0;
}


function formatRawPrice(pricing = {}){

  return (
    pricing.averagePriceText ||
    pricing.avgPriceText ||
    pricing.pricePerSqmText ||
    pricing.priceText ||
    pricing.averagePricePerSqmText ||
    pricing.averagePrice ||
    pricing.avgPrice ||
    pricing.pricePerSqm ||
    'N/A'
  );
}

function formatRawPriceGrowth(pricing = {}){

  return (
    pricing.growthYoYText ||
    pricing.priceGrowthYoYText ||
    pricing.growthText ||
    pricing.priceGrowthText ||
    pricing.growthYoY ||
    pricing.priceGrowthYoY ||
    pricing.growth ||
    'N/A'
  );
}

function buildMarketSnapshot(data){

  const report =
    data.report || {};

  return {
    city:data.city,
    category:data.category,

    investmentScore:
      Number(report?.en?.investmentScore || data.investmentScore || 0),

    infrastructure:
      getScore(report,'marketDrivers','infrastructure'),

    urbanMigration:
      getScore(report,'marketDrivers','migration'),

    industrialExpansion:
      getScore(report,'marketDrivers','industrial'),

    creditCapitalFlow:
      getScore(report,'marketDrivers','credit'),

    investmentMomentum:
      getScore(report,'marketBehavior','momentum'),

    speculativeHeat:
      getScore(report,'marketBehavior','speculative'),

    liquidity:
      getScore(report,'marketBehavior','liquidity'),

    marketMaturity:
      getScore(report,'marketBehavior','maturity'),

    populationScale:
        getScore(report,'fundamentalSignals','population'),

    grdpStrength:
        getScore(report,'fundamentalSignals','grdp'),

    tourismDemand:
        getScore(report,'fundamentalSignals','tourism'),

    priceScore:
      Number(data.pricing?.priceScore || 0),

    rawPrice:
      data.pricing?.averagePriceText || 'N/A',

    priceGrowthScore:
      Number(data.pricing?.priceGrowthScore || 0),

    rawPriceGrowth:
      data.pricing?.growthYoYText || 'N/A',

    thesis:
      report?.en?.executiveThesis || '',

    conclusion:
      report?.en?.conclusion || '',

    risks:
      report?.en?.risks || [],

    opportunityZones:
      report?.en?.emergingAreas || []
  };
}

function rankBy(markets, key, desc = true){

  return [...markets].sort((a,b)=>
    desc
      ? b[key] - a[key]
      : a[key] - b[key]
  );
}

function compareMarkets(markets = []){

  const rankedByScore =
    rankBy(markets,'investmentScore');

  const strongestInfrastructure =
    rankBy(markets,'infrastructure')[0];
  
  const bestMomentum =
  rankBy(markets,'investmentMomentum')[0];

  const bestLiquidity =
    rankBy(markets,'liquidity')[0];

  const highestSpeculation =
    rankBy(markets,'speculativeHeat')[0];

  const mostMature =
    rankBy(markets,'marketMaturity')[0];

  const bestPrice =
    rankBy(markets,'priceScore')[0];

  const strongestPriceGrowth =
    rankBy(markets,'priceGrowthScore')[0];

  const averageScore =
    getAverage(
      markets.map(m => m.investmentScore)
    );

  return {
    markets,

    summary:{
      topMarket:
        rankedByScore[0]?.city || null,

      bestMomentum:
        bestMomentum?.city || null,

      strongestInfrastructure:
        strongestInfrastructure?.city || null,

      bestLiquidity:
        bestLiquidity?.city || null,

      highestSpeculation:
        highestSpeculation?.city || null,

      bestPrice:
        bestPrice?.city || null,

      strongestPriceGrowth:
        strongestPriceGrowth?.city || null,

      mostMature:
        mostMature?.city || null
    },

    rankings:{
      investmentScore: rankedByScore,
      infrastructure: rankBy(markets,'infrastructure'),
      liquidity: rankBy(markets,'liquidity'),
      speculativeHeat: rankBy(markets,'speculativeHeat'),
      marketMaturity: rankBy(markets,'marketMaturity'),
      priceScore: rankBy(markets,'priceScore'),
      priceGrowthScore: rankBy(markets,'priceGrowthScore')
    }
  };
}

module.exports = {
  buildMarketSnapshot,
  compareMarkets
};