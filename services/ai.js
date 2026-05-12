const OpenAI = require('openai');

const client = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY
});

const {
  getCache,
  setCache
} = require('../cache/cache');

async function extractPlaces(text){
  const cacheKey =
  `ai-${Buffer
    .from(text)
    .toString('base64')
    .slice(0,120)
  }`;

  const cached = getCache(cacheKey);

  if(cached){
    return cached;
  }

  const completion =
    await client.chat.completions.create({

      model:'gpt-4.1-mini',

      messages:[
        {
          role:'system',
          content:`
            You are an expert travel and food
            data extraction AI.

            Extract ONLY REAL restaurant,
            cafe, food market, street food,
            bar, nightlife or food-related
            place names from the text.

            Rules:

            - Return ONLY JSON array
            - No explanation
            - No markdown
            - No fake names
            - No generic phrases
            - Ignore country names
            - Ignore cities
            - Ignore cuisines
            - Ignore descriptions

            - TikTok captions may contain
              emojis, hashtags and slang

            - Extract actual venue names
              even if mixed with hashtags

            - Ignore hashtags unless
              they are actual venue names

            - Social media captions may
              contain spam words, emojis,
              uppercase text and trending slang

            - Extract only real physical venues

            GOOD:
            ["An Cafe","Still Cafe"]

            BAD:
            ["Best Food In Da Lat"]

            If no places found:
            return []

            Only include actual venue names.
          `
        },
        {
          role:'user',
          content:text
        }

      ],

      temperature:0

    });

  const content =
    completion.choices[0].message.content;

  try{

    const parsed = JSON.parse(content);

    setCache(
      cacheKey,
      parsed
    );

    return parsed;

  }catch(err){

    console.log(
    err.response?.data ||
    err.message
    );

    return [];

  }

}

module.exports = {
  extractPlaces
};