import CurrencyInput from "./CurrencyInput.jsx";
import PercentInput from "./PercentInput.jsx";
import { fmt } from "../lib/formatters.js";

export default function IncomeSection({ vals, updateField, pnl }) {
  return (
    <>
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
            color: "#22c55e",
            textTransform: "uppercase",
          }}
        >
          Income
        </span>
        <span style={{ fontSize: "11px", color: "#475569", marginLeft: "8px" }}>
          · monthly
        </span>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr className="pnl-row" style={{ borderBottom: "1px solid #1e293b" }}>
            <td
              style={{
                padding: "10px 16px",
                color: "#94a3b8",
                fontSize: "13px",
                paddingLeft: "32px",
              }}
            >
              Gross Market Rent
              <span style={{ color: "#475569", fontSize: "11px", marginLeft: "4px" }}>/mo</span>
            </td>
            <td style={{ padding: "10px 16px", textAlign: "right" }}>
              <CurrencyInput
                value={vals.rent}
                onChange={(v) => updateField("rent", v)}
                step={100}
              />
            </td>
          </tr>
          <tr className="pnl-row" style={{ borderBottom: "1px solid #1e293b" }}>
            <td
              style={{
                padding: "10px 16px",
                color: "#94a3b8",
                fontSize: "13px",
                paddingLeft: "32px",
              }}
            >
              Vacancy / Credit Loss
              <PercentInput
                value={vals.vacancy_pct}
                onChange={(v) => updateField("vacancy_pct", v)}
              />
            </td>
            <td
              style={{
                padding: "10px 16px",
                textAlign: "right",
                color: "#f87171",
                fontSize: "14px",
              }}
            >
              ({fmt(pnl.vacancy_loss)}/mo)
            </td>
          </tr>
          <tr className="pnl-row" style={{ borderBottom: "2px solid #334155" }}>
            <td
              style={{
                padding: "10px 16px",
                color: "#e2e8f0",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              Effective Gross Income
              <span style={{ color: "#64748b", fontSize: "11px", fontWeight: 400, marginLeft: "4px" }}>
                /mo
              </span>
            </td>
            <td
              style={{
                padding: "10px 16px",
                textAlign: "right",
                color: "#4ade80",
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              {fmt(pnl.effective_rent)}/mo
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
