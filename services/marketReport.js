const OpenAI = require('openai');

const client = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY
});

const {
    getCache,
    setCache
} = require('../cache/cache');


async function generateMarketReport({

    city,
    category,
    videos,
    listings,
    pricing

}){
    const cacheKey =
        `market-report-${city}-${category}`;

    const cached =
        getCache(cacheKey);

    if(cached){
        return cached;
    }

    const condensedVideos =

        videos.map(v => `

            TITLE:
            ${v.title}

            CREATOR:
            ${v.creator}

            PLACES:
            ${(v.places || []).join(', ')}

        `).join('\n');

    const condensedListings =

        listings.map(item => `

            TITLE:
            ${item.title}

            SNIPPET:
            ${item.snippet}

        `).join('\n');

    const content = `

        CITY:
        ${city}

        CATEGORY:
        ${category}

        SOCIAL CONTENT:
        ${condensedVideos.slice(0,12000)}

        LISTINGS:
        ${condensedListings.slice(0,12000)}

        PRICING:
        ${JSON.stringify(pricing).slice(0,4000)}

    `;

    const completion =
        await client.chat.completions.create({

        model:'gpt-4.1',

        messages:[

            {
            role:'system',
            content:`

    You are a world-class real estate
    investment strategist.

    Analyze:

    - social media sentiment
    - infrastructure trends
    - investment momentum
    - luxury movement
    - urban development
    - infrastructure catalysts
    - speculative risk
    - pricing trends

    Return ONLY valid JSON.

    FORMAT:

    {
    "overview":"",
    "sentiment":"",
    "opportunities":[
        ""
    ],
    "risks":[
        ""
    ],
    "emergingAreas":[
        ""
    ],
    "pricingSummary":"",
    "investmentScore":0
    }

    `
            },

            {
            role:'user',
            content
            }

        ],

        temperature:0.4

        });

    try {

        let result = JSON.parse(
            completion.choices[0]
            .message
            .content
        );

        setCache(
            cacheKey,
            result,
            60 * 60 * 24
        );

        return result;

    } catch (e) {

        console.log("ERROR WHEN PARSING THE MARKET REPORT");

        return {
            overview:"No report generated.",
            sentiment:"Neutral",
            opportunities:[],
            risks:[],
            emergingAreas:[],
            pricingSummary:"No pricing data.",
            investmentScore:0
        };

    }
}

module.exports = {
    generateMarketReport
};