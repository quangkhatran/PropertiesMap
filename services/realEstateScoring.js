const positiveKeywords = [

  "airport",
  "sân bay",

  "bridge",
  "cầu",

  "highway",
  "cao tốc",

  "metro",

  "industrial",
  "khu công nghiệp",

  "fdi",

  "urban area",
  "đô thị",

  "master plan",
  "quy hoạch",

  "infrastructure",
  "hạ tầng",

  "port",
  "cảng",

  "logistics",

  "railway",
  "đường sắt"
];

function calculateRealEstateScore(item){

  const text = `
    ${item.title || ""}
    ${(item.places || []).join(" ")}
  `.toLowerCase();

  let score = 0;

  positiveKeywords.forEach(keyword => {

    if(text.includes(keyword.toLowerCase())){

      score += 10;
    }
  });

  return score;
}

module.exports = {

  calculateRealEstateScore
};