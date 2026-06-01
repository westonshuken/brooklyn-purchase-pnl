import {
  BUYING_COSTS,
  RENT_GROWTH_RATE,
  SELLING_COSTS,
  TAX_GROWTH_RATE,
  CAP_GAINS_TAX_RATE,
  ORDINARY_INCOME_TAX_RATE,
} from "../lib/constants.js";
import { computeExitAnalysis } from "../lib/calculations.js";
import { computeExitTaxes, fmt } from "../lib/formatters.js";

const inputStyle = {
  background: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "4px",
  color: "#f1f5f9",
  padding: "4px 8px",
  width: "52px",
  textAlign: "center",
  fontSize: "12px",
  fontFamily: "inherit",
  minHeight: "28px",
};

const rowLabelStyle = { whiteSpace: "nowrap", flexShrink: 0 };
const rowValueStyle = { whiteSpace: "nowrap", textAlign: "right", marginLeft: "8px" };
const accentColor = "#60a5fa";

export default function ExitAnalysis({ vals, purchasePrice, holdYears, appreciationPct, updateField }) {
  const years = Math.max(Math.round(holdYears), 1);
  const s = computeExitAnalysis(vals, purchasePrice, years, appreciationPct);
  const sellCostPct = (SELLING_COSTS * 100).toFixed(2);
  const apprLabel = appreciationPct.toFixed(1).replace(/\.0$/, "");
  const { capGainsTax, ordinaryTax, totalTax } = computeExitTaxes(s.netSaleProceeds, s.totalRentalIncome);
  const profitAfterTax = s.totalReturn - totalTax;

  return (
    <div
      style={{
        background: "#0b1120",
        border: "1px solid #1e293b",
        borderRadius: "12px",
        overflow: "visible",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          background: "#0f172a",
          padding: "10px 16px",
          borderBottom: "1px solid #1e293b",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "2px",
            color: "#f59e0b",
            textTransform: "uppercase",
          }}
        >
          {years}-Year Total Return
        </span>
        <span style={{ fontSize: "11px", color: "#475569", display: "inline-flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          <span className="no-print">all-cash · hold</span>
          <input
            type="number"
            value={holdYears}
            min={1}
            max={30}
            step={1}
            onChange={(e) => {
              const next = Math.min(30, Math.max(1, Number(e.target.value) || 1));
              updateField("hold_years", next);
            }}
            style={inputStyle}
            className="no-print"
          />
          <span className="no-print">yr · appr</span>
          <input
            type="number"
            value={appreciationPct}
            min={0}
            max={20}
            step={0.5}
            onChange={(e) => updateField("appreciation_pct", Number(e.target.value))}
            style={inputStyle}
            className="no-print"
          />
          <span style={{ whiteSpace: "nowrap" }}>
            {years} yr · {apprLabel}%/yr appr · rent +{(RENT_GROWTH_RATE * 100).toFixed(0)}%/yr · tax +{(TAX_GROWTH_RATE * 100).toFixed(0)}%/yr
          </span>
        </span>
      </div>
      <div style={{ padding: "20px 16px", maxWidth: "420px" }}>
        <div style={{ fontSize: "11px", color: "#475569", marginBottom: "2px" }}>
          {apprLabel}%/yr appreciation
        </div>
        <div
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: accentColor,
            marginBottom: "16px",
          }}
        >
          {s.annualized.toFixed(1)}% IRR
        </div>
        <div style={{ fontSize: "12px", color: "#64748b", lineHeight: "2" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={rowLabelStyle}>Buy costs ({(BUYING_COSTS * 100).toFixed(1)}%)</span>
            <span className="exit-row-value" style={{ ...rowValueStyle, color: "#f87171" }}>({fmt(s.buyingCosts)})</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={rowLabelStyle}>Sale price</span>
            <span className="exit-row-value" style={{ ...rowValueStyle, color: "#94a3b8" }}>{fmt(s.salePrice)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={rowLabelStyle}>Sell costs ({sellCostPct}%)</span>
            <span className="exit-row-value" style={{ ...rowValueStyle, color: "#f87171" }}>({fmt(s.sellCosts)})</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={rowLabelStyle}>Appr. gain</span>
            <span className="exit-row-value" style={{ ...rowValueStyle, color: "#94a3b8" }}>{fmt(s.netSaleProceeds)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={rowLabelStyle}>Cash flow ({years}yr)</span>
            <span className="exit-row-value" style={{ ...rowValueStyle, color: "#94a3b8" }}>{fmt(s.totalRentalIncome)}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              borderTop: "1px solid #1e293b",
              paddingTop: "4px",
              marginTop: "2px",
            }}
          >
            <span style={rowLabelStyle}>Total profit</span>
            <span className="exit-row-value" style={{ ...rowValueStyle, color: accentColor, fontWeight: 600 }}>{fmt(s.totalReturn)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={rowLabelStyle}>Cap gains tax ({(CAP_GAINS_TAX_RATE * 100).toFixed(0)}%)</span>
            <span className="exit-row-value" style={{ ...rowValueStyle, color: "#f87171" }}>({fmt(capGainsTax)})</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={rowLabelStyle}>Income tax ({(ORDINARY_INCOME_TAX_RATE * 100).toFixed(0)}%)</span>
            <span className="exit-row-value" style={{ ...rowValueStyle, color: "#f87171" }}>({fmt(ordinaryTax)})</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ ...rowLabelStyle, fontWeight: 600 }}>Net after tax</span>
            <span className="exit-row-value" style={{ ...rowValueStyle, color: accentColor, fontWeight: 600 }}>
              {fmt(profitAfterTax)}
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          background: "#0a0f1a",
          padding: "10px 16px",
          borderTop: "1px solid #1e293b",
          fontSize: "11px",
          color: "#475569",
        }}
      >
        Buy costs ~1.4% (NYC mansion tax, title, attorney). Selling costs ~{sellCostPct}% (broker + transfer taxes). Exit cash flow: rent +{(RENT_GROWTH_RATE * 100).toFixed(0)}%/yr, property tax +{(TAX_GROWTH_RATE * 100).toFixed(0)}%/yr. {(CAP_GAINS_TAX_RATE * 100).toFixed(0)}% LTCG on appr. gain, {(ORDINARY_INCOME_TAX_RATE * 100).toFixed(0)}% ordinary income tax on cash flow. IRR before tax.
      </div>
    </div>
  );
}
