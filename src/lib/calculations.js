import { BUYING_COSTS, RENT_GROWTH_RATE, SELLING_COSTS } from "./constants.js";
import { pct } from "./formatters.js";

export function getInvestment(purchasePrice) {
  const price = Math.max(purchasePrice, 0);
  if (price === 0) {
    return { purchasePrice: 0, buyingCosts: 0, totalInvested: 0 };
  }
  const buyingCosts = price * BUYING_COSTS;
  const totalInvested = price + buyingCosts;
  return { purchasePrice: price, buyingCosts, totalInvested };
}

export function computePNL(vals) {
  const { purchasePrice, buyingCosts, totalInvested } = getInvestment(vals.purchase_price);
  const gross_rent = vals.rent;
  const vacancy_loss = gross_rent * (vals.vacancy_pct / 100);
  const effective_rent = gross_rent - vacancy_loss;
  const mgmt_fee = effective_rent * (vals.mgmt_pct / 100);

  const total_income = effective_rent;
  const operating_expenses =
    vals.prop_tax +
    vals.hoa +
    vals.insurance +
    vals.maintenance +
    mgmt_fee +
    vals.utilities +
    vals.other;
  const net_cashflow = total_income - operating_expenses;

  const annual_cf = net_cashflow * 12;
  const coc = totalInvested > 0 ? (annual_cf / totalInvested) * 100 : 0;
  const cap_rate = totalInvested > 0 ? ((net_cashflow * 12) / totalInvested) * 100 : 0;
  const break_even_rent = operating_expenses / (1 - vals.vacancy_pct / 100);

  return {
    gross_rent,
    vacancy_loss,
    effective_rent,
    mgmt_fee,
    total_income,
    operating_expenses,
    net_cashflow,
    annual_cf,
    coc,
    cap_rate,
    break_even_rent,
    purchasePrice,
    buyingCosts,
    totalInvested,
  };
}

/** Sum annual cash flow over hold period with compounding rent growth each year. */
export function computeTotalRentalIncome(annualCf, years, growthRate = RENT_GROWTH_RATE) {
  const holdYears = Math.max(Math.round(years), 1);
  if (growthRate === 0) return annualCf * holdYears;

  let total = 0;
  for (let y = 0; y < holdYears; y++) {
    total += annualCf * Math.pow(1 + growthRate, y);
  }
  return total;
}

export function computeExitScenarios(annualCf, purchasePrice, scenarios, years) {
  const { purchasePrice: price, buyingCosts, totalInvested } = getInvestment(purchasePrice);
  const holdYears = Math.max(Math.round(years), 1);
  const invested = totalInvested > 0 ? totalInvested : 1;

  return scenarios.map((s) => {
    const salePrice = price * Math.pow(1 + s.appr, holdYears);
    const sellCosts = salePrice * SELLING_COSTS;
    const netSaleProceeds = salePrice - sellCosts - price;
    const totalRentalIncome = computeTotalRentalIncome(annualCf, holdYears);
    const totalReturn = salePrice - sellCosts - totalInvested + totalRentalIncome;
    const endingValue = salePrice - sellCosts + totalRentalIncome;
    const annualized =
      totalInvested > 0
        ? (Math.pow(endingValue / invested, 1 / holdYears) - 1) * 100
        : 0;

    return {
      ...s,
      salePrice,
      sellCosts,
      buyingCosts,
      netSaleProceeds,
      totalRentalIncome,
      totalReturn,
      totalInvested,
      annualized,
      annualizedLabel: pct(annualized),
      holdYears,
    };
  });
}

export function buildMetrics(pnl) {
  return [
    { label: "Monthly Cash Flow", value: pnl.net_cashflow, highlight: true },
    { label: "Annual Cash Flow", value: pnl.annual_cf, highlight: true },
    { label: "Cap Rate", value: pct(pnl.cap_rate), neutral: true },
    { label: "Cash-on-Cash Return", value: pct(pnl.coc), neutral: true },
    { label: "Break-even Rent", value: pnl.break_even_rent, neutral: true, isCurrency: true },
  ];
}
