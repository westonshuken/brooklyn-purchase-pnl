import { fmt } from "../lib/formatters.js";

const BENCHMARK_RATE = 0.04;

export default function FixedReturnBenchmark({ totalInvested, holdYears }) {
  const years = Math.max(Math.round(holdYears), 1);
  const endingValue = totalInvested * Math.pow(1 + BENCHMARK_RATE, years);
  const totalProfit = endingValue - totalInvested;

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
        }}
      >
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "2px",
            color: "#a78bfa",
            textTransform: "uppercase",
          }}
        >
          {years}-Year Benchmark — {(BENCHMARK_RATE * 100).toFixed(0)}% Annual Return
        </span>
      </div>
      <div style={{ padding: "20px 16px" }}>
        <div style={{ fontSize: "11px", color: "#475569", marginBottom: "2px" }}>
          {(BENCHMARK_RATE * 100).toFixed(0)}%/yr on total cash invested
        </div>
        <div
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#a78bfa",
            marginBottom: "16px",
          }}
        >
          {(BENCHMARK_RATE * 100).toFixed(0)}% CAGR
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
        Simple comparison: total cash invested compounded at {(BENCHMARK_RATE * 100).toFixed(0)}% per
        year for {years} years. No rent, appreciation, or transaction costs.
      </div>
    </div>
  );
}
