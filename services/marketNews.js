const Parser = require('rss-parser');

const parser = new Parser();

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const translationCache = new Map();

async function translateToVietnamese(text=''){

  if(!text){
    return '';
  }

  const cacheKey = text.trim();

  if(translationCache.has(cacheKey)){
    return translationCache.get(cacheKey);
  }

  try{

    const response =
      await openai.chat.completions.create({

        model:'gpt-4.1-mini',

        messages:[
          {
            role:'system',
            content:
              'Translate the following real estate or investment news into natural Vietnamese. Keep company names, project names and proper nouns unchanged.'
          },
          {
            role:'user',
            content:text
          }
        ],

        temperature:0.2,
        max_tokens:500

      });

    const translated =
      response.choices?.[0]?.message?.content?.trim() || text;

    translationCache.set(cacheKey, translated);

    return translated;

  }catch(err){

    console.log(
      'TRANSLATION ERROR:',
      err.message
    );

    return text;

  }

}



async function getMarketNews(locations = [], options = {}) {

  const allNews = [];

  const category = options.category || 'real estate';
  const lang = options.lang || 'en';
  const limitPerLocation = options.limitPerLocation || 8;

  for(const location of locations){

    const query = buildQuery(location, category);

    const rssUrl =
      'https://news.google.com/rss/search?q=' +
      encodeURIComponent(query) +
      '&hl=en-US&gl=US&ceid=US:en';

    try{

      const feed =
        await parser.parseURL(rssUrl);

      const items =
        feed.items.slice(0, limitPerLocation);

      for(const item of items){

        const title = cleanText(item.title || '');
        const summary = cleanText(item.contentSnippet || item.title || '');

        const translatedTitle =
          lang === 'vi'
            ? await translateToVietnamese(title)
            : title;

        const translatedSummary =
          lang === 'vi'
            ? await translateToVietnamese(summary)
            : summary;

        allNews.push({

          title,
          title_vi: translatedTitle,

          summary,
          summary_vi: translatedSummary,
          url:item.link,
          publishedAt:item.pubDate,

          location:
            detectLocation(`${title} ${summary}`, location),

          category:
            detectCategory(`${title} ${summary}`),

          impactScore:
            calculateImpact(`${title} ${summary}`),

          signalType:
            detectSignalType(`${title} ${summary}`),

          signalIcon:
            getSignalIcon(detectSignalType(`${title} ${summary}`)),

          trendDirection:
            detectTrendDirection(`${title} ${summary}`)

        });

      }

    }catch(err){

      console.log(
        'MARKET NEWS ERROR:',
        err.message
      );

    }

  }

  const news = dedupeNews(allNews)
    .sort((a,b)=>{
      if((b.impactScore || 0) !== (a.impactScore || 0)){
        return (b.impactScore || 0) - (a.impactScore || 0);
      }
      return new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0);
    });

  const insight =
    generateMarketInsight(
      news,
      locations[0] || 'this market'
    );

  const insight_vi =
    lang === 'vi'
      ? await translateToVietnamese(insight)
      : insight;

  return {
    news,
    insight,
    insight_vi,
    marketTemperature: calculateMarketTemperature(news),
    temperatureScore: calculateTemperatureScore(news)
  };

}

function buildQuery(location, category){

  const baseTerms = [
    location,
    'real estate',
    'FDI',
    'foreign investment',
    'infrastructure',
    'industrial park'
  ];

  if(category && category !== 'all'){
    baseTerms.push(category);
  }

  if(
    location.toLowerCase().includes('nhon trach') ||
    location.toLowerCase().includes('long thanh') ||
    location.toLowerCase().includes('dong nai')
  ){
    baseTerms.push('Dong Nai');
    baseTerms.push('Long Thanh airport');
  }

  return baseTerms.join(' ');

}

function cleanText(text=''){
  return String(text)
    .replace(/\s+-\s+Google News$/i,'')
    .replace(/\s+/g,' ')
    .trim();
}

function normalizeTitle(title=''){
  return cleanText(title)
    .toLowerCase()
    .replace(/[“”"'’]/g,'')
    .replace(/\s+-\s+[^-]+$/,'')
    .replace(/[^a-z0-9À-ỹ\s]/gi,'')
    .replace(/\s+/g,' ')
    .trim();
}

function dedupeNews(items=[]){

  const uniqueMap = new Map();

  for(const item of items){

    const key = normalizeTitle(item.title);

    if(!key){
      continue;
    }

    if(!uniqueMap.has(key)){
      uniqueMap.set(key,item);
      continue;
    }

    const existing = uniqueMap.get(key);

    if((item.impactScore || 0) > (existing.impactScore || 0)){
      uniqueMap.set(key,item);
    }

  }

  return [...uniqueMap.values()];

}

function detectLocation(text, fallback='Vietnam'){

  const t = text.toLowerCase();

  if(
    t.includes('nhon trach') ||
    t.includes('nhơn trạch')
  ){
    return 'Nhơn Trạch';
  }

  if(
    t.includes('long thanh') ||
    t.includes('long thành')
  ){
    return 'Long Thành';
  }

  if(
    t.includes('dong nai') ||
    t.includes('đồng nai')
  ){
    return 'Đồng Nai';
  }

  return fallback || 'Vietnam';

}

function detectCategory(text){

  const t = text.toLowerCase();

  if(
    t.includes('fdi') ||
    t.includes('foreign investment') ||
    t.includes('foreign investor') ||
    t.includes('factory') ||
    t.includes('plant')
  ){
    return 'FDI';
  }

  if(
    t.includes('airport') ||
    t.includes('bridge') ||
    t.includes('expressway') ||
    t.includes('ring road') ||
    t.includes('port')
  ){
    return 'Infrastructure';
  }

  if(
    t.includes('industrial park') ||
    t.includes('industrial property') ||
    t.includes('logistics')
  ){
    return 'Industrial';
  }

  if(
    t.includes('real estate') ||
    t.includes('property') ||
    t.includes('land')
  ){
    return 'Real Estate';
  }

  return 'General';

}


function detectSignalType(text){

  const t = text.toLowerCase();

  if(
    t.includes('airport') ||
    t.includes('aviation') ||
    t.includes('terminal')
  ){
    return 'Airport';
  }

  if(
    t.includes('fdi') ||
    t.includes('foreign investment') ||
    t.includes('foreign investor') ||
    t.includes('semiconductor') ||
    t.includes('high-tech')
  ){
    return 'FDI';
  }

  if(
    t.includes('bridge') ||
    t.includes('expressway') ||
    t.includes('ring road') ||
    t.includes('transport') ||
    t.includes('infrastructure')
  ){
    return 'Infrastructure';
  }

  if(
    t.includes('industrial park') ||
    t.includes('factory') ||
    t.includes('plant') ||
    t.includes('logistics') ||
    t.includes('warehouse') ||
    t.includes('port')
  ){
    return 'Industrial';
  }

  if(
    t.includes('real estate') ||
    t.includes('property') ||
    t.includes('land') ||
    t.includes('apartment') ||
    t.includes('housing')
  ){
    return 'Real Estate';
  }

  return 'General';

}

function getSignalIcon(type){

  const icons = {
    Airport:'✈️',
    FDI:'🌏',
    Infrastructure:'🏗️',
    Industrial:'🏭',
    'Real Estate':'🏘️',
    General:'🛰️'
  };

  return icons[type] || icons.General;

}

function detectTrendDirection(text){

  const t = text.toLowerCase();

  const strongPositive = [
    'approved',
    'broke ground',
    'starts construction',
    'started construction',
    'new investment',
    'invest',
    'expansion',
    'boost',
    'launch',
    'opens',
    'chooses vietnam'
  ];

  const negative = [
    'delay',
    'delayed',
    'fine',
    'fines',
    'violation',
    'breach',
    'risk',
    'slowdown',
    'decline',
    'concern'
  ];

  if(negative.some(word => t.includes(word))){
    return '↘ Watch Risk';
  }

  if(strongPositive.some(word => t.includes(word))){
    return '↗ Strong Positive';
  }

  if(
    t.includes('airport') ||
    t.includes('infrastructure') ||
    t.includes('industrial') ||
    t.includes('fdi')
  ){
    return '↗ Positive';
  }

  return '→ Neutral';

}

function calculateTemperatureScore(news=[]){

  if(!news.length){
    return 0;
  }

  const avgImpact = news.reduce((sum,item)=> sum + (item.impactScore || 0), 0) / news.length;

  const highImpactCount = news.filter(item => (item.impactScore || 0) >= 8).length;
  const strategicCount = news.filter(item =>
    ['FDI','Airport','Infrastructure','Industrial'].includes(item.signalType)
  ).length;

  const score = Math.round(
    avgImpact +
    Math.min(highImpactCount,3) * 0.7 +
    Math.min(strategicCount,4) * 0.35
  );

  return Math.max(0, Math.min(score, 10));

}

function calculateMarketTemperature(news=[]){

  const score = calculateTemperatureScore(news);

  if(score >= 8){
    return 'HOT 🔥';
  }

  if(score >= 6){
    return 'WARM ↗';
  }

  if(score >= 4){
    return 'WATCHING →';
  }

  return 'QUIET 🧊';

}

function calculateImpact(text){

  const t = text.toLowerCase();

  let score = 5;

  if(t.includes('airport')) score += 2;
  if(t.includes('long thanh')) score += 1;
  if(t.includes('fdi') || t.includes('foreign investment')) score += 2;
  if(t.includes('factory') || t.includes('plant')) score += 1;
  if(t.includes('industrial park') || t.includes('logistics')) score += 1;
  if(t.includes('approved') || t.includes('construction') || t.includes('broke ground')) score += 1;
  if(t.includes('semiconductor') || t.includes('high-tech')) score += 1;

  return Math.min(score,10);

}

function generateMarketInsight(news=[], city='this market'){

  if(!news.length){
    return `No major live market signals were detected for ${city} yet. Keep monitoring FDI, infrastructure and industrial park updates.`;
  }

  const top = news[0];
  const categories = new Set(news.map(item => item.category));

  const hasFdi = categories.has('FDI');
  const hasInfrastructure = categories.has('Infrastructure');
  const hasIndustrial = categories.has('Industrial');

  if(hasFdi && hasInfrastructure){
    return `Fresh FDI and infrastructure signals suggest that ${city} remains an active market to monitor, especially for airport-linked growth, industrial land demand and logistics-driven real estate opportunities.`;
  }

  if(hasFdi){
    return `Foreign investment signals are currently the strongest theme for ${city}. New factory, manufacturing or investor activity may support long-term demand for industrial and residential real estate.`;
  }

  if(hasInfrastructure){
    return `Infrastructure news is currently the strongest driver for ${city}. Transport, airport, bridge or expressway progress may improve accessibility and support future land value expectations.`;
  }

  if(hasIndustrial){
    return `Industrial and logistics signals are visible for ${city}. This may strengthen demand around industrial parks, worker housing, services and commercial real estate.`;
  }

  return `The most relevant current signal for ${city} is: ${top.title}. Impact score is ${top.impactScore}/10.`;

}

module.exports = {
  getMarketNews
};
