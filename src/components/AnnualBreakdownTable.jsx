import {
  ORDINARY_INCOME_TAX_RATE,
  RENT_GROWTH_RATE,
  TAX_GROWTH_RATE,
} from "../lib/constants.js";
import { computeAnnualBreakdown } from "../lib/calculations.js";
import { fmt, pct } from "../lib/formatters.js";

const thStyle = {
  padding: "10px 12px",
  textAlign: "right",
  fontSize: "10px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: "#64748b",
  fontWeight: 600,
  borderBottom: "1px solid #1e293b",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "10px 12px",
  textAlign: "right",
  fontSize: "12px",
  color: "#94a3b8",
  borderBottom: "1px solid #1e293b",
  whiteSpace: "nowrap",
};

function plColor(n) {
  return n >= 0 ? "#4ade80" : "#f87171";
}

export default function AnnualBreakdownTable({ vals, holdYears }) {
  const appreciationRate = Math.max(vals.appreciation_pct, 0) / 100;
  const { rows, totalInvested, appreciationRate: appr } = computeAnnualBreakdown(
    vals,
    holdYears,
    appreciationRate
  );

  if (rows.length === 0) return null;

  return (
    <div
      style={{
        background: "#0b1120",
        border: "1px solid #1e293b",
        borderRadius: "12px",
        overflow: "hidden",
        marginTop: "12px",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          background: "#0f172a",
          padding: "10px 16px",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "2px",
            color: "#38bdf8",
            textTransform: "uppercase",
          }}
        >
          Year-by-Year Return
        </span>
        <span style={{ fontSize: "11px", color: "#475569", marginLeft: "8px" }}>
          · {(appr * 100).toFixed(1).replace(/\.0$/, "")}% appr · rent +{(RENT_GROWTH_RATE * 100).toFixed(0)}%/yr · tax +{(TAX_GROWTH_RATE * 100).toFixed(0)}%/yr
        </span>
      </div>
      <div className="annual-table-wrap" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "720px" }}>
          <thead>
            <tr style={{ background: "#0a0f1a" }}>
              <th style={{ ...thStyle, textAlign: "left", paddingLeft: "16px" }}>Year</th>
              <th style={thStyle}>Cash Flow</th>
              <th style={thStyle}>After-Tax CF</th>
              <th style={thStyle}>Appr. Gain</th>
              <th style={thStyle}>Year P/L</th>
              <th style={thStyle}>Return %</th>
              <th style={thStyle}>Cum. P/L</th>
              <th style={{ ...thStyle, paddingRight: "16px" }}>Cum. Return %</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.year} className="pnl-row">
                <td style={{ ...tdStyle, textAlign: "left", paddingLeft: "16px", color: "#e2e8f0" }}>
                  {row.year}
                </td>
                <td style={{ ...tdStyle, color: plColor(row.cashFlow) }}>{fmt(row.cashFlow)}</td>
                <td style={{ ...tdStyle, color: plColor(row.afterTaxCf) }}>{fmt(row.afterTaxCf)}</td>
                <td style={{ ...tdStyle, color: plColor(row.annualApprGain) }}>{fmt(row.annualApprGain)}</td>
                <td style={{ ...tdStyle, color: plColor(row.yearPl), fontWeight: 600 }}>{fmt(row.yearPl)}</td>
                <td style={{ ...tdStyle, color: plColor(row.returnPct) }}>{pct(row.returnPct)}</td>
                <td style={{ ...tdStyle, color: plColor(row.cumulativePl), fontWeight: 600 }}>
                  {fmt(row.cumulativePl)}
                </td>
                <td style={{ ...tdStyle, paddingRight: "16px", color: plColor(row.cumReturnPct), fontWeight: 600 }}>
                  {pct(row.cumReturnPct)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        Return % = year P/L ÷ total cash invested ({fmt(totalInvested)}). After-tax cash flow uses{" "}
        {(ORDINARY_INCOME_TAX_RATE * 100).toFixed(0)}% on positive rent income. Appr. gain is unrealized.
        Does not include sell costs or {(15).toFixed(0)}% LTCG until exit.
      </div>
    </div>
  );
}
