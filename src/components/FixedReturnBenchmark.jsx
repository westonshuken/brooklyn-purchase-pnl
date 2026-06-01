import { ORDINARY_INCOME_TAX_RATE } from "../lib/constants.js";
import { fmt, taxOnProfit } from "../lib/formatters.js";

const rateInputStyle = {
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

export default function FixedReturnBenchmark({ totalInvested, holdYears, benchmarkPct, updateField }) {
  const years = Math.max(Math.round(holdYears), 1);
  const rate = Math.max(benchmarkPct, 0) / 100;
  const rateLabel = benchmarkPct.toFixed(1).replace(/\.0$/, "");
  const endingValue = totalInvested * Math.pow(1 + rate, years);
  const totalProfit = endingValue - totalInvested;
  const ordinaryTax = taxOnProfit(totalProfit, ORDINARY_INCOME_TAX_RATE);
  const profitAfterTax = totalProfit - ordinaryTax;

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
          gap: "8px",
          flexWrap: "nowrap",
          overflowX: "auto",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "2px",
            color: "#a78bfa",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {years}-Year Benchmark — High Yield Savings/CD
        </span>
        <span
          style={{
            fontSize: "11px",
            color: "#475569",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
          className="no-print"
        >
          <input
            type="number"
            value={benchmarkPct}
            min={0}
            max={20}
            step={0.1}
            onChange={(e) => updateField("benchmark_pct", Number(e.target.value))}
            style={rateInputStyle}
          />
          <span>%/yr</span>
        </span>
      </div>
      <div style={{ padding: "20px 16px" }}>
        <div style={{ fontSize: "11px", color: "#475569", marginBottom: "2px" }}>
          {rateLabel}%/yr compounded on total cash invested
        </div>
        <div
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#a78bfa",
            marginBottom: "16px",
          }}
        >
          {rateLabel}% CAGR
        </div>
        <div style={{ fontSize: "12px", color: "#64748b", lineHeight: "2" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Total cash invested</span>
            <span style={{ color: "#94a3b8" }}>{fmt(totalInvested)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Ending value ({years}yr)</span>
            <span style={{ color: "#94a3b8" }}>{fmt(endingValue)}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #1e293b",
              paddingTop: "4px",
              marginTop: "2px",
            }}
          >
            <span>Total profit</span>
            <span style={{ color: "#a78bfa", fontWeight: 600 }}>{fmt(totalProfit)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Ordinary income tax ({(ORDINARY_INCOME_TAX_RATE * 100).toFixed(0)}%)</span>
            <span style={{ color: "#f87171" }}>({fmt(ordinaryTax)})</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 600 }}>Net after tax</span>
            <span style={{ color: "#a78bfa", fontWeight: 600 }}>{fmt(profitAfterTax)}</span>
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
        High yield savings / CD comparison: total cash invested compounded at {rateLabel}% per year
        for {years} years. {(ORDINARY_INCOME_TAX_RATE * 100).toFixed(0)}% ordinary income tax on profit
        (simplified). No rent, appreciation, or transaction costs.
      </div>
    </div>
  );
}
