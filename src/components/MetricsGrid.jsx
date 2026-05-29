import { fmt } from "../lib/formatters.js";

export default function MetricsGrid({ metrics }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "12px",
        marginBottom: "24px",
      }}
    >
      {metrics.map((m) => {
        const isPositive = typeof m.value === "number" && m.value >= 0;
        const displayValue =
          typeof m.value === "number"
            ? fmt(m.value)
            : m.isCurrency
              ? fmt(m.value)
              : m.value;

        return (
          <div
            key={m.label}
            style={{
              background: "#0b1120",
              border: `1px solid ${
                m.highlight ? (isPositive ? "#166534" : "#7f1d1d") : "#1e293b"
              }`,
              borderRadius: "10px",
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "#475569",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                marginBottom: "6px",
              }}
            >
              {m.label}
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: m.highlight ? (isPositive ? "#4ade80" : "#f87171") : "#94a3b8",
              }}
            >
              {displayValue}
            </div>
          </div>
        );
      })}
    </div>
  );
}
