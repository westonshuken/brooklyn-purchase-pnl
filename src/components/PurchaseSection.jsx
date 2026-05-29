import CurrencyInput from "./CurrencyInput.jsx";
import { fmt } from "../lib/formatters.js";
import { BUYING_COSTS, PURCHASE_PRICE_STEP } from "../lib/constants.js";

export default function PurchaseSection({ vals, updateField, pnl }) {
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
            color: "#a78bfa",
            textTransform: "uppercase",
          }}
        >
          Purchase
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
              Cash Purchase Price
            </td>
            <td style={{ padding: "10px 16px", textAlign: "right" }}>
              <CurrencyInput
                value={vals.purchase_price}
                onChange={(v) => updateField("purchase_price", v)}
                step={PURCHASE_PRICE_STEP}
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
              Buy Costs
              <span style={{ color: "#475569", fontSize: "11px", marginLeft: "4px" }}>
                ({(BUYING_COSTS * 100).toFixed(1)}%)
              </span>
            </td>
            <td
              style={{
                padding: "10px 16px",
                textAlign: "right",
                color: "#f87171",
                fontSize: "14px",
              }}
            >
              ({fmt(pnl.buyingCosts)})
            </td>
          </tr>
          <tr className="pnl-row" style={{ borderBottom: "2px solid #334155" }}>
            <td
              style={{
                padding: "10px 16px",
                color: "#e2e8f0",
                fontWeight: 700,
                fontSize: "14px",
                paddingLeft: "32px",
              }}
            >
              Total Cash Invested
            </td>
            <td
              style={{
                padding: "10px 16px",
                textAlign: "right",
                color: "#f8fafc",
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              {fmt(pnl.totalInvested)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export function PurchaseSubtitle({ pnl }) {
  if (pnl.purchasePrice <= 0) {
    return (
      <div style={{ color: "#64748b", fontSize: "13px", marginTop: "6px" }}>
        All-cash purchase · no mortgage
      </div>
    );
  }

  return (
    <div style={{ color: "#64748b", fontSize: "13px", marginTop: "6px" }}>
      {fmt(pnl.totalInvested)} total cash invested · {fmt(pnl.purchasePrice)} purchase +{" "}
      {(BUYING_COSTS * 100).toFixed(1)}% buy costs · no mortgage
    </div>
  );
}
