function calculateInvestmentScore({

  infrastructureExpansion = 0,
  urbanMigration = 0,
  industrialCorporateExpansion = 0,
  creditCapitalFlow = 0,
  investmentMomentum = 0,
  speculativeHeat = 0,
  liquidity = 0,
  marketMaturity = 0,
  populationScale = 0,
  grdpStrength = 0,
  tourismDemand = 0

}){

  let score = 0;

  score += infrastructureExpansion * 0.14;
  score += urbanMigration * 0.09;
  score += industrialCorporateExpansion * 0.12;
  score += creditCapitalFlow * 0.08;
  score += investmentMomentum * 0.13;
  score += liquidity * 0.10;
  score += marketMaturity * 0.08;

  score += populationScale * 0.08;
  score += grdpStrength * 0.10;
  score += tourismDemand * 0.04;

  const speculationQuality =
    speculativeHeat <= 6
      ? speculativeHeat
      : 10 - ((speculativeHeat - 6) * 1.5);

  score += speculationQuality * 0.04;

  score = Math.max(
    0,
    Math.min(10, score)
  );

  return Math.round(score * 10) / 10;

}

module.exports = {
  calculateInvestmentScore
};