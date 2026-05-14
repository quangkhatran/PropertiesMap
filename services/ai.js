const OpenAI = require('openai');

const client = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY
});

const {
  getCache,
  setCache
} = require('../cache/cache');

const {
  getPrompt
} = require('./prompts');

async function extractPlaces(
  text,
  mode = "lifestyle"
){
  const cacheKey =
  `${mode}-ai-${Buffer
    .from(text)
    .toString('base64')
    .slice(0,120)
  }`;

  const cached = getCache(cacheKey);

  if(cached){
    return cached;
  }

  console.log("=========================");
  console.log("PROMPT: ", getPrompt(mode));

  const completion =
    await client.chat.completions.create({

      model:'gpt-4.1-mini',

      messages:[
        {
          role:'system',
          content: getPrompt(mode)
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
      parsed,
      60 * 60 * 24 * 30
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