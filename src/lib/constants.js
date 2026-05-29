export const numericDefaults = {
  purchase_price: 0,
  hold_years: 5,
  rent: 0,
  vacancy_pct: 0,
  prop_tax: 0,
  hoa: 0,
  insurance: 0,
  maintenance: 0,
  mgmt_pct: 0,
  utilities: 0,
  other: 0,
};

export const stringDefaults = {
  listing_url: "",
};

export const defaults = { ...numericDefaults, ...stringDefaults };

export const SCENARIO_KEYS = Object.keys(numericDefaults);
export const STRING_KEYS = Object.keys(stringDefaults);

export const STORAGE_KEY = "brooklyn-purchase-pnl-v1";

export const SELLING_COSTS = 0.06;
export const BUYING_COSTS = 0.014;
export const RENT_GROWTH_RATE = 0.03;

export const EXIT_SCENARIOS = [
  { label: "Conservative", appr: 0.03, color: "#94a3b8", accent: "#334155" },
  { label: "Base Case", appr: 0.05, color: "#60a5fa", accent: "#1e3a5f" },
  { label: "Optimistic", appr: 0.07, color: "#4ade80", accent: "#166534" },
];

export const EXPENSE_ITEMS = [
  { label: "Property Tax", key: "prop_tax", step: 50 },
  { label: "HOA / Common Charges", key: "hoa", step: 50 },
  { label: "Insurance", key: "insurance", step: 10 },
  { label: "Maintenance & Repairs", key: "maintenance", step: 25 },
  { label: "Utilities (landlord-paid)", key: "utilities", step: 25 },
  { label: "Other", key: "other", step: 25 },
];

export const PURCHASE_PRICE_STEP = 10_000;

export const REPORT_TITLE = "Brooklyn Purchase";
