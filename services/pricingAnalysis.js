function extractPrices(text=''){

  const matches = [

    ...text.matchAll(
      /(\d+(?:[.,]\d+)?)\s*(tỷ|ty)/gi
    ),

    ...text.matchAll(
      /(\d+(?:[.,]\d+)?)\s*(triệu|tr|million)?\s*\/?\s*(m²|m2)/gi
    )

  ];

  return matches.map(match=>{

    const value =
      parseFloat(
        match[1].replace(',','.')
      );

    const unit =
      (match[2] || '').toLowerCase();

    const areaUnit =
      (match[3] || '').toLowerCase();

    return {
      raw:match[0],
      value,
      unit,
      areaUnit,
      isPerSqm:
        areaUnit === 'm²' ||
        areaUnit === 'm2'
    };

  });

}

function extractGrowth(text=''){

  const matches = [
    ...text.matchAll(
      /(?:tăng|growth|increase|up|yoy|year[-\s]?on[-\s]?year)[^\d]{0,20}(\d+(?:[.,]\d+)?)\s*%/gi
    ),

    ...text.matchAll(
      /(\d+(?:[.,]\d+)?)\s*%\s*(?:yoy|year[-\s]?on[-\s]?year|so với năm trước|tăng)/gi
    )
  ];

  return matches.map(match => ({
    raw: match[0],
    value: parseFloat(match[1].replace(',','.'))
  }));
}

function getMedian(values=[]){

  const nums =
    values
      .filter(v =>
        typeof v === 'number' &&
        !Number.isNaN(v) &&
        v > 0
      )
      .sort((a,b)=>a-b);

  if(!nums.length) return 0;

  const mid =
    Math.floor(nums.length / 2);

  return nums.length % 2
    ? nums[mid]
    : (nums[mid - 1] + nums[mid]) / 2;
}

function priceScoreFromMillionPerSqm(priceMillionPerSqm){

  if(!priceMillionPerSqm) return 0;

  // Lower entry price receives a higher score.
  // This is an affordability / entry-price score, not a luxury price score.
  if(priceMillionPerSqm <= 10) return 10;
  if(priceMillionPerSqm <= 20) return 9;
  if(priceMillionPerSqm <= 30) return 8;
  if(priceMillionPerSqm <= 45) return 7;
  if(priceMillionPerSqm <= 60) return 6;
  if(priceMillionPerSqm <= 80) return 5;
  if(priceMillionPerSqm <= 110) return 4;
  if(priceMillionPerSqm <= 150) return 3;
  if(priceMillionPerSqm <= 220) return 2;

  return 1;
}

function growthScoreFromPercent(growthPercent){

  if(!growthPercent) return 0;

  if(growthPercent >= 30) return 10;
  if(growthPercent >= 25) return 9;
  if(growthPercent >= 20) return 8;
  if(growthPercent >= 15) return 7;
  if(growthPercent >= 10) return 6;
  if(growthPercent >= 7) return 5;
  if(growthPercent >= 5) return 4;
  if(growthPercent >= 3) return 3;
  if(growthPercent > 0) return 2;

  return 1;
}

function summarizeCluster(prices=[]){

  if(!prices.length){

    return {
      count:0,
      median:null,
      samples:[]
    };

  }

  const sorted =
    prices
      .map(p=>p.value)
      .sort((a,b)=>a-b);

  const median =
    sorted[
      Math.floor(
        sorted.length / 2
      )
    ];

  return {

    count:prices.length,

    median,

    samples:
      prices
        .slice(0,5)
        .map(p=>p.raw)

  };

}

function analyzePricing(listings=[]){

  const clusters = {

    urban:[],
    luxury:[],
    rural:[],
    industrial:[],
    apartment:[]

  };

  const allPerSqmPrices = [];
  const allGrowthRates = [];

  listings.forEach(item=>{

    const text = `
      ${item.title || ''}
      ${item.snippet || ''}
      ${item.description || ''}
    `.toLowerCase();

    const prices =
      extractPrices(text);

    const growthRates =
      extractGrowth(text);

    allGrowthRates.push(
      ...growthRates.map(g => g.value)
    );

    const perSqmPrices =
      prices.filter(price => price.isPerSqm);

    allPerSqmPrices.push(
      ...perSqmPrices.map(price => price.value)
    );

    if(!prices.length){
      return;
    }

    if(
      text.includes('khu công nghiệp') ||
      text.includes('industrial') ||
      text.includes('factory') ||
      text.includes('logistics')
    ){

      clusters.industrial.push(...prices);

    }

    else if(
      text.includes('villa') ||
      text.includes('luxury') ||
      text.includes('compound') ||
      text.includes('biệt thự')
    ){

      clusters.luxury.push(...prices);

    }

    else if(
      text.includes('căn hộ') ||
      text.includes('apartment') ||
      text.includes('condo') ||
      text.includes('chung cư')
    ){

      clusters.apartment.push(...prices);

    }

    else if(
      text.includes('đất vườn') ||
      text.includes('farm') ||
      text.includes('rural')
    ){

      clusters.rural.push(...prices);

    }

    else{

      clusters.urban.push(...prices);

    }

  });

  const averagePrice =
    getMedian(allPerSqmPrices);

  const averagePriceText =
    averagePrice
      ? `${Math.round(averagePrice * 10) / 10} triệu/m²`
      : 'N/A';

  const priceScore =
    priceScoreFromMillionPerSqm(averagePrice);

  const growthYoY =
    getMedian(allGrowthRates);

  const growthYoYText =
    growthYoY
      ? `+${Math.round(growthYoY * 10) / 10}% YoY`
      : 'N/A';

  const priceGrowthScore =
    growthScoreFromPercent(growthYoY);

  return {

    averagePrice,
    averagePriceText,
    priceScore,

    growthYoY,
    growthYoYText,
    priceGrowthScore,

    urban:
      summarizeCluster(
        clusters.urban
      ),

    luxury:
      summarizeCluster(
        clusters.luxury
      ),

    rural:
      summarizeCluster(
        clusters.rural
      ),

    industrial:
      summarizeCluster(
        clusters.industrial
      ),

    apartment:
      summarizeCluster(
        clusters.apartment
      )

  };

}

module.exports = {
  analyzePricing
};
