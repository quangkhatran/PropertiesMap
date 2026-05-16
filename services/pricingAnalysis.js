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

    return {
      raw:match[0],
      value:parseFloat(
        match[1].replace(',','.')
      ),
      unit:match[2] || ''
    };

  });

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

  listings.forEach(item=>{

    const text = `
      ${item.title || ''}
      ${item.snippet || ''}
    `.toLowerCase();

    const prices =
      extractPrices(text);

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

  return {

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