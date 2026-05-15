function extractPrices(text=''){

  const matches = [

    ...text.matchAll(
      /(\d+(?:[.,]\d+)?)\s*(tỷ|ty)/gi
    ),

    ...text.matchAll(
      /(\d+(?:[.,]\d+)?)\s*(triệu|tr|million)?\s*\/?\s*(m²|m2)/gi
    )

  ];

  return matches.map(
    match => match[0]
  );

}

function analyzePricing(listings=[]){

  const prices = [];

  listings.forEach(item=>{

    const text = `
      ${item.title || ''}
      ${item.snippet || ''}
    `;

    const extracted =
      extractPrices(text);

    prices.push(...extracted);

  });

  return prices;

}

module.exports = {
  analyzePricing
};