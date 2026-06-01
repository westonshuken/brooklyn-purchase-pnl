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
