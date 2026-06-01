import {
  EXIT_SCENARIOS,
  BUYING_COSTS,
  RENT_GROWTH_RATE,
  SELLING_COSTS,
  TAX_GROWTH_RATE,
} from "../lib/constants.js";
import { computeExitScenarios } from "../lib/calculations.js";
import { fmt } from "../lib/formatters.js";

const yearsInputStyle = {
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

export default function ExitAnalysis({ vals, purchasePrice, holdYears, updateField }) {
  const years = Math.max(Math.round(holdYears), 1);
  const scenarios = computeExitScenarios(vals, purchasePrice, EXIT_SCENARIOS, years);
  const sellCostPct = (SELLING_COSTS * 100).toFixed(2);

  return (
    <div
      style={{
        background: "#0b1120",
        border: "1px solid #1e293b",
        borderRadius: "12px",
        overflow: "hidden",
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
        <span style={{ fontSize: "11px", color: "#475569", display: "inline-flex", alignItems: "center", gap: "6px" }}>
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
            style={yearsInputStyle}
            className="no-print"
          />
          <span style={{ whiteSpace: "nowrap" }}>
            {years} yr hold · sell yr {years} · rent +{(RENT_GROWTH_RATE * 100).toFixed(0)}%/yr · tax +{(TAX_GROWTH_RATE * 100).toFixed(0)}%/yr
          </span>
        </span>
      </div>
      <div
        className="exit-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
        }}
      >
        {scenarios.map((s, i) => (
          <div
            key={s.label}
            className="exit-scenario"
            style={{
              padding: "20px 16px",
              borderRight: i < 2 ? "1px solid #1e293b" : "none",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: s.color,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                marginBottom: "12px",
                fontWeight: 600,
              }}
            >
              {s.label}
            </div>
            <div style={{ fontSize: "11px", color: "#475569", marginBottom: "2px" }}>
              {(s.appr * 100).toFixed(0)}%/yr appreciation
            </div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: s.color,
                marginBottom: "16px",
              }}
            >
              {s.annualized.toFixed(1)}% IRR
            </div>
            <div style={{ fontSize: "12px", color: "#64748b", lineHeight: "2" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={rowLabelStyle}>Buy costs ({(BUYING_COSTS * 100).toFixed(1)}%)</span>
                <span style={{ ...rowValueStyle, color: "#f87171" }}>({fmt(s.buyingCosts)})</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={rowLabelStyle}>Sale price</span>
                <span style={{ ...rowValueStyle, color: "#94a3b8" }}>{fmt(s.salePrice)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={rowLabelStyle}>Sell costs ({sellCostPct}%)</span>
                <span style={{ ...rowValueStyle, color: "#f87171" }}>({fmt(s.sellCosts)})</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={rowLabelStyle}>Appr. gain</span>
                <span style={{ ...rowValueStyle, color: "#94a3b8" }}>{fmt(s.netSaleProceeds)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={rowLabelStyle}>Cash flow ({years}yr)</span>
                <span style={{ ...rowValueStyle, color: "#94a3b8" }}>{fmt(s.totalRentalIncome)}</span>
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
                <span style={{ ...rowValueStyle, color: s.color, fontWeight: 600 }}>{fmt(s.totalReturn)}</span>
              </div>
            </div>
          </div>
        ))}
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
        Buy costs ~1.4% (NYC mansion tax, title, attorney). Selling costs ~{sellCostPct}% (broker + transfer taxes). Exit cash flow: rent +{(RENT_GROWTH_RATE * 100).toFixed(0)}%/yr, property tax +{(TAX_GROWTH_RATE * 100).toFixed(0)}%/yr. IRR on total cash invested. Depreciation recapture &amp; cap gains tax not included.
      </div>
    </div>
  );
}
