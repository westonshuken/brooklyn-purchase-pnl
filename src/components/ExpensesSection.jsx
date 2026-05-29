import CurrencyInput from "./CurrencyInput.jsx";
import PercentInput from "./PercentInput.jsx";
import { EXPENSE_ITEMS } from "../lib/constants.js";
import { fmt } from "../lib/formatters.js";

export default function ExpensesSection({ vals, updateField, pnl }) {
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
            color: "#f87171",
            textTransform: "uppercase",
          }}
        >
          Operating Expenses
        </span>
        <span style={{ fontSize: "11px", color: "#475569", marginLeft: "8px" }}>
          · monthly
        </span>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {EXPENSE_ITEMS.map(({ label, key, step }) => (
            <tr key={key} className="pnl-row" style={{ borderBottom: "1px solid #1e293b" }}>
              <td
                style={{
                  padding: "10px 16px",
                  color: "#94a3b8",
                  fontSize: "13px",
                  paddingLeft: "32px",
                }}
              >
                {label}
                <span style={{ color: "#475569", fontSize: "11px", marginLeft: "4px" }}>/mo</span>
              </td>
              <td style={{ padding: "10px 16px", textAlign: "right" }}>
                <CurrencyInput
                  value={vals[key]}
                  onChange={(v) => updateField(key, v)}
                  step={step}
                />
              </td>
            </tr>
          ))}
          <tr className="pnl-row" style={{ borderBottom: "1px solid #1e293b" }}>
            <td
              style={{
                padding: "10px 16px",
                color: "#94a3b8",
                fontSize: "13px",
                paddingLeft: "32px",
              }}
            >
              Property Management
              <span style={{ color: "#475569", fontSize: "11px", marginLeft: "4px" }}>/mo</span>
              <PercentInput
                value={vals.mgmt_pct}
                onChange={(v) => updateField("mgmt_pct", v)}
                step={1}
              />
            </td>
            <td
              style={{
                padding: "10px 16px",
                textAlign: "right",
                color: "#f1f5f9",
                fontSize: "14px",
              }}
            >
              {fmt(pnl.mgmt_fee)}
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
              Total Operating Expenses
              <span style={{ color: "#64748b", fontSize: "11px", fontWeight: 400, marginLeft: "4px" }}>
                /mo
              </span>
            </td>
            <td
              style={{
                padding: "10px 16px",
                textAlign: "right",
                color: "#f87171",
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              ({fmt(pnl.operating_expenses)}/mo)
            </td>
          </tr>
          <tr className="pnl-row">
            <td
              style={{
                padding: "14px 16px",
                color: "#f8fafc",
                fontWeight: 700,
                fontSize: "16px",
                letterSpacing: "0.5px",
              }}
            >
              NET MONTHLY CASH FLOW
            </td>
            <td style={{ padding: "14px 16px", textAlign: "right" }}>
              <span
                style={{
                  color: pnl.net_cashflow >= 0 ? "#4ade80" : "#f87171",
                  fontWeight: 700,
                  fontSize: "20px",
                }}
              >
                {fmt(pnl.net_cashflow)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
