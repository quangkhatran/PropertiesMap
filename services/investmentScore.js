function calculateInvestmentScore({

  infrastructureExpansion = 0,
  urbanMigration = 0,
  industrialCorporateExpansion = 0,
  creditCapitalFlow = 0,
  investmentMomentum = 0,
  speculativeHeat = 0,
  liquidity = 0,
  marketMaturity = 0

}){

  let score = 0;

  score += infrastructureExpansion * 0.18;
  score += urbanMigration * 0.12;
  score += industrialCorporateExpansion * 0.15;
  score += creditCapitalFlow * 0.10;
  score += investmentMomentum * 0.18;
  score += liquidity * 0.12;
  score += marketMaturity * 0.10;

  const speculationQuality =
    speculativeHeat <= 6
      ? speculativeHeat
      : 10 - ((speculativeHeat - 6) * 1.5);

  score += speculationQuality * 0.05;

  score = Math.max(
    0,
    Math.min(10, score)
  );

  return Math.round(score * 10) / 10;

}

module.exports = {
  calculateInvestmentScore
};