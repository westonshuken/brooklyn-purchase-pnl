import { BUYING_COSTS, RENT_GROWTH_RATE, SELLING_COSTS, TAX_GROWTH_RATE } from "./constants.js";
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

/** Annual cash flow for a given hold year (0 = year 1). Rent +3%/yr; property tax +5%/yr. */
export function computeAnnualCashFlowForYear(vals, yearIndex) {
  const rentGrowth = Math.pow(1 + RENT_GROWTH_RATE, yearIndex);
  const taxGrowth = Math.pow(1 + TAX_GROWTH_RATE, yearIndex);

  const gross_rent_annual = vals.rent * 12 * rentGrowth;
  const vacancy_loss_annual = gross_rent_annual * (vals.vacancy_pct / 100);
  const effective_rent_annual = gross_rent_annual - vacancy_loss_annual;
  const mgmt_annual = effective_rent_annual * (vals.mgmt_pct / 100);
  const tax_annual = vals.prop_tax * 12 * taxGrowth;
  const fixed_opex_annual =
    (vals.hoa + vals.insurance + vals.maintenance + vals.utilities + vals.other) * 12;

  return effective_rent_annual - mgmt_annual - tax_annual - fixed_opex_annual;
}

/** Sum annual cash flow over hold with rent +3%/yr and property tax +5%/yr. */
export function computeTotalCashFlowOverHold(vals, years) {
  const holdYears = Math.max(Math.round(years), 1);
  let total = 0;
  for (let y = 0; y < holdYears; y++) {
    total += computeAnnualCashFlowForYear(vals, y);
  }
  return total;
}

export function computeExitScenarios(vals, purchasePrice, scenarios, years) {
  const { purchasePrice: price, buyingCosts, totalInvested } = getInvestment(purchasePrice);
  const holdYears = Math.max(Math.round(years), 1);
  const invested = totalInvested > 0 ? totalInvested : 1;

  return scenarios.map((s) => {
    const salePrice = price * Math.pow(1 + s.appr, holdYears);
    const sellCosts = salePrice * SELLING_COSTS;
    const netSaleProceeds = salePrice - sellCosts - price;
    const totalRentalIncome = computeTotalCashFlowOverHold(vals, holdYears);
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
