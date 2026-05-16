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
    pricing,
    investmentScore

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

        OFFICIAL INVESTMENT SCORE:
        ${investmentScore}/10

        IMPORTANT:
        You MUST use this exact investment score in both:
        en.investmentScore
        vi.investmentScore
        Do not invent another investment score.

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

    You are a world-class institutional real estate intelligence strategist.

    Analyze:

    - social media sentiment
    - infrastructure trends
    - investment momentum
    - luxury movement
    - urban development
    - infrastructure catalysts
    - speculative risk
    - pricing trends

    For every signal score:

    - explain WHY the score was given
    - identify specific infrastructure catalysts
    - explain investor psychology
    - distinguish organic demand vs speculation
    - mention legal/liquidity quality
    - explain urbanization drivers
    - explain industrial/FDI impact

    Do not create repetitive sections.

    Connect all signals into one institutional investment memo.

    Evaluate these Market Fundamentals:

    - Population Scale
    - GRDP Strength
    - Tourism Demand

    Important:
    Do not invent exact numerical statistics.
    If exact data is not provided, describe qualitatively.
    Use terms such as high, medium, low, growing, industrial-driven, tourism-driven.

    After that, Market Drivers should explain structural forces:
    - infrastructure expansion
    - urban migration
    - industrial / corporate expansion
    - credit and capital flow

    And then, Market Behavior should explain:
    - investment momentum
    - speculative heat
    - liquidity
    - market maturity

    Avoid repeating the same point in multiple sections.

    Do NOT calculate the final Institutional Investment Score.

    Only score these 11 factors from 0 to 10:

    Market Fundamentals:
    - Population Scale
    - GRDP Strength
    - Tourism Demand

    Market Drivers:
    - Infrastructure Expansion
    - Urban Migration
    - Industrial / Corporate Expansion
    - Credit and Capital Flow

    Market Behavior:
    - Investment Momentum
    - Speculative Heat
    - Liquidity
    - Market Maturity

    Always return exactly these factor names.
    Do not invent different factor names.

    Set investmentScore to 0.
    The backend will calculate the final Institutional Investment Score.

    Return ONLY valid JSON.

    FORMAT:

    {
        "en":{
            "executiveThesis":"",
            "investmentScore":0,
            "scoreExplanation":"",
            "fundamentalSignals":[
            {
                "name":"Population Scale",
                "score":0,
                "analysis":""
            },
            {
                "name":"GRDP Strength",
                "score":0,
                "analysis":""
            },
            {
                "name":"Tourism Demand",
                "score":0,
                "analysis":""
            }
            ],
            "marketDrivers":[
            {
                "name":"Infrastructure Expansion",
                "score":0,
                "analysis":""
            },
            {
                "name":"Urban Migration",
                "score":0,
                "analysis":""
            },
            {
                "name":"Industrial / Corporate Expansion",
                "score":0,
                "analysis":""
            },
            {
                "name":"Credit and Capital Flow",
                "score":0,
                "analysis":""
            }
            ],
            "marketBehavior":[
            {
                "name":"Investment Momentum",
                "score":0,
                "analysis":""
            },
            {
                "name":"Speculative Heat",
                "score":0,
                "analysis":""
            },
            {
                "name":"Liquidity",
                "score":0,
                "analysis":""
            },
            {
                "name":"Market Maturity",
                "score":0,
                "analysis":""
            }
            ],
            "pricingValuation":"",
            "emergingAreas":[
            {
                "name":"",
                "summary":"",
                "opportunity":"",
                "risk":""
            }
            ],
            "risks":[""],
            "conclusion":""
        },
        "vi":{
            "executiveThesis":"",
            "investmentScore":0,
            "scoreExplanation":"",
            "fundamentalSignals":[
            {
                "name":"Population Scale",
                "score":0,
                "analysis":""
            },
            {
                "name":"GRDP Strength",
                "score":0,
                "analysis":""
            },
            {
                "name":"Tourism Demand",
                "score":0,
                "analysis":""
            }
            ],
            "marketDrivers":[
            {
                "name":"Infrastructure Expansion",
                "score":0,
                "analysis":""
            },
            {
                "name":"Urban Migration",
                "score":0,
                "analysis":""
            },
            {
                "name":"Industrial / Corporate Expansion",
                "score":0,
                "analysis":""
            },
            {
                "name":"Credit and Capital Flow",
                "score":0,
                "analysis":""
            }
            ],
            "marketBehavior":[
            {
                "name":"Investment Momentum",
                "score":0,
                "analysis":""
            },
            {
                "name":"Speculative Heat",
                "score":0,
                "analysis":""
            },
            {
                "name":"Liquidity",
                "score":0,
                "analysis":""
            },
            {
                "name":"Market Maturity",
                "score":0,
                "analysis":""
            }
            ],
            "pricingValuation":"",
            "emergingAreas":[
            {
                "name":"",
                "summary":"",
                "opportunity":"",
                "risk":""
            }
            ],
            "risks":[""],
            "conclusion":""
        }
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

        if(result.en){
            result.en.investmentScore = investmentScore;
        }

        if(result.vi){
            result.vi.investmentScore = investmentScore;
        }

        result.investmentScore = investmentScore;

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