import { CAP_GAINS_TAX_RATE, ORDINARY_INCOME_TAX_RATE } from "./constants.js";

export const fmt = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const pct = (n) => `${n.toFixed(1)}%`;

export function taxOnProfit(profit, rate) {
  return Math.max(profit, 0) * rate;
}

export function computeExitTaxes(netSaleProceeds, totalRentalIncome) {
  const capGainsTax = taxOnProfit(netSaleProceeds, CAP_GAINS_TAX_RATE);
  const ordinaryTax = taxOnProfit(totalRentalIncome, ORDINARY_INCOME_TAX_RATE);
  return {
    capGainsTax,
    ordinaryTax,
    totalTax: capGainsTax + ordinaryTax,
  };
}
