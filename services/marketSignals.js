const OpenAI = require('openai');

const {
  getCache,
  setCache
} = require('../cache/cache');

const client = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY
});

async function analyzeMarketSignals({

  city,
  category,
  videos

}){

  const cacheKey =

    `signals-${city}-${category}`;

  const cached =
    getCache(cacheKey);

  if(cached){

    console.log(
      'CACHE HIT:',
      cacheKey
    );

    return cached;

  }

  const summarizedVideos =

    videos.slice(0,20).map(video=>({

      title:video.title,

      description:
        video.description,

      places:
        video.places

    }));

  const completion =
    await client.chat.completions.create({

      model:'gpt-4.1-mini',

      messages:[

        {
          role:'system',

          content:`

You are an elite real estate
macro analyst.

Analyze the market using:

- infrastructure momentum
- airport/highway/bridge signals
- industrial expansion
- FDI potential
- urbanization
- speculative behavior
- luxury migration
- investor sentiment
- infrastructure catalysts
- pricing behavior
- legal transparency
- liquidity conditions
- macro investment flows

Explain WHY each score is given.

Be analytical and institutional.

Mention:
- key infrastructure projects
- airport/highway catalysts
- speculative risks
- investor psychology
- urbanization trends
- industrial growth
- luxury migration signals
- liquidity quality
- pricing behavior

Do NOT give generic answers.


Return ONLY valid JSON.

FORMAT:

{

  "infrastructure":{

    "score":0-10,

    "reasoning":"",

    "drivers":[
      ""
    ]

  },

  "investmentMomentum":{

    "score":0-10,

    "reasoning":"",

    "drivers":[
      ""
    ]

  },

  "speculativeHeat":{

    "score":0-10,

    "reasoning":"",

    "drivers":[
      ""
    ]

  },

  "luxuryMigration":{

    "score":0-10,

    "reasoning":"",

    "drivers":[
      ""
    ]

  },

  "marketMaturity":{

    "score":0-10,

    "reasoning":"",

    "drivers":[
      ""
    ]

  },

  "pricingAnalysis":{

    "observedRange":"",

    "reasoning":"",

    "marketDirection":""

  },

  "marketRisks":[
    ""
  ],

  "overallConclusion":"",

  "overallOpportunity":"",

  "overallRisk":""

}

`

        },

        {
          role:'user',

          content:`

CITY:
${city}

CATEGORY:
${category}

VIDEOS:
${JSON.stringify(
  summarizedVideos
)}

`

        }

      ],

      temperature:0.3

    });

  const parsed = JSON.parse(

    completion.choices[0]
    .message
    .content

  );

  setCache(

    cacheKey,

    parsed,

    60 * 60 * 24 * 30

  );

  return parsed;

}

module.exports = {
  analyzeMarketSignals
};