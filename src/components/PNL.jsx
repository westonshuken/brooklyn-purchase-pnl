import { useScenarioState } from "../hooks/useScenarioState.js";
import {
  BUYING_COSTS,
  RENT_GROWTH_RATE,
  REPORT_TITLE,
  SELLING_COSTS,
  TAX_GROWTH_RATE,
} from "../lib/constants.js";
import { buildMetrics, computePNL } from "../lib/calculations.js";
import ListingSection from "./ListingSection.jsx";
import PurchaseSection, { PurchaseSubtitle } from "./PurchaseSection.jsx";
import IncomeSection from "./IncomeSection.jsx";
import ExpensesSection from "./ExpensesSection.jsx";
import MetricsGrid from "./MetricsGrid.jsx";
import ExitAnalysis from "./ExitAnalysis.jsx";
import FixedReturnBenchmark from "./FixedReturnBenchmark.jsx";
import AnnualBreakdownTable from "./AnnualBreakdownTable.jsx";

const buttonStyle = {
  background: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "6px",
  color: "#94a3b8",
  padding: "8px 14px",
  fontSize: "12px",
  fontFamily: "inherit",
  cursor: "pointer",
  minHeight: "36px",
};

export default function PNL() {
  const { vals, updateField, reset, copyLink, copied, exportPdf } = useScenarioState();
  const pnl = computePNL(vals);
  const metrics = buildMetrics(pnl);
  const listingUrl = vals.listing_url.trim();
  const hasListingUrl = listingUrl.startsWith("http://") || listingUrl.startsWith("https://");

  return (
    <div
      className="report-root"
      style={{
        minHeight: "100vh",
        background: "#020817",
        fontFamily: "'DM Mono', 'Courier New', monospace",
        padding: "clamp(20px, 5vw, 40px) clamp(12px, 4vw, 20px)",
        color: "#e2e8f0",
      }}
    >
      <div id="report" className="report-content">
        <div style={{ marginBottom: "36px" }}>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "3px",
              color: "#475569",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Rental Investment Analysis
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(22px, 5vw, 28px)",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "#f8fafc",
              lineHeight: 1.2,
            }}
          >
            {REPORT_TITLE}
          </h1>
          <PurchaseSubtitle pnl={pnl} />
          {hasListingUrl && (
            <div
              className="print-listing-header"
              style={{ marginTop: "10px", fontSize: "12px" }}
            >
              <span style={{ color: "#64748b" }}>Listing: </span>
              <a
                href={listingUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#60a5fa", wordBreak: "break-all" }}
                className="report-listing-link"
              >
                {listingUrl}
              </a>
            </div>
          )}
          <div
            className="header-actions no-print"
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "16px",
              flexWrap: "wrap",
            }}
          >
            <button type="button" onClick={copyLink} style={buttonStyle}>
              {copied ? "Copied!" : "Copy link"}
            </button>
            <button type="button" onClick={exportPdf} style={buttonStyle}>
              Export PDF
            </button>
            <button type="button" onClick={reset} style={buttonStyle}>
              Clear all
            </button>
          </div>
        </div>

        <div className="no-print">
          <ListingSection listingUrl={vals.listing_url} updateField={updateField} />
        </div>

        <div
          className="no-print"
          style={{
            background: "#0f172a",
            border: "1px solid #1e3a5f",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "24px",
            fontSize: "12px",
            color: "#60a5fa",
            lineHeight: "1.6",
          }}
        >
          Enter listing details below. Paste a listing URL, then use <strong>Export PDF</strong> to
          save a report with a clickable link (choose &ldquo;Save as PDF&rdquo; in the print dialog).
        </div>

        <div
          style={{
            background: "#0b1120",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "24px",
          }}
        >
          <PurchaseSection vals={vals} updateField={updateField} pnl={pnl} />
          <IncomeSection vals={vals} updateField={updateField} pnl={pnl} />
          <ExpensesSection vals={vals} updateField={updateField} pnl={pnl} />
        </div>

        <MetricsGrid metrics={metrics} />
        <ExitAnalysis
          vals={vals}
          purchasePrice={vals.purchase_price}
          holdYears={vals.hold_years}
          appreciationPct={vals.appreciation_pct}
          updateField={updateField}
        />
        <FixedReturnBenchmark
          totalInvested={pnl.totalInvested}
          holdYears={vals.hold_years}
          benchmarkPct={vals.benchmark_pct}
          updateField={updateField}
        />

        <div
          style={{
            background: "#0b1120",
            border: "1px solid #1e293b",
            borderRadius: "10px",
            padding: "16px",
            fontSize: "12px",
            color: "#475569",
            lineHeight: "1.8",
          }}
        >
          <div
            style={{
              color: "#64748b",
              fontWeight: 600,
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "11px",
            }}
          >
            Model Assumptions
          </div>
          <div>• All-cash purchase — no mortgage or debt service</div>
          <div>• Buy costs {(BUYING_COSTS * 100).toFixed(1)}% included in cap rate, cash-on-cash, and exit IRR</div>
          <div>• Selling costs {(SELLING_COSTS * 100).toFixed(2)}% applied at exit (broker + transfer taxes)</div>
          <div>• Rent and operating expenses entered as monthly amounts</div>
          <div>• Exit model: rent +{(RENT_GROWTH_RATE * 100).toFixed(0)}%/yr, property tax +{(TAX_GROWTH_RATE * 100).toFixed(0)}%/yr</div>
          <div>• Cap rate and cash-on-cash based on total cash invested</div>
          <div>• Exit: 15% LTCG on appr. gain, 30% ordinary income tax on cash flow; CD/HYS: 30% on profit</div>
          <div>• Does not include depreciation or detailed federal/state tax treatment</div>
        </div>

        <div
          style={{
            background: "#0b1120",
            border: "1px solid #1e293b",
            borderRadius: "10px",
            padding: "16px",
            marginTop: "12px",
            fontSize: "12px",
            color: "#475569",
            lineHeight: "1.8",
          }}
        >
          <div
            style={{
              color: "#64748b",
              fontWeight: 600,
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "11px",
            }}
          >
            Cap Rate vs. Cash-on-Cash
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong style={{ color: "#94a3b8" }}>Cap rate</strong> — annual net operating income
            (rent minus operating expenses, before debt) divided by total cash invested. It measures
            how productive the asset is, and is often used to compare properties regardless of
            financing.
          </div>
          <div>
            <strong style={{ color: "#94a3b8" }}>Cash-on-cash return</strong> — annual cash flow
            divided by the total cash you put in (purchase price plus buy costs). It measures your
            personal return on invested dollars. With a mortgage, cash-on-cash typically differs from
            cap rate; in this all-cash model both use the same inputs, so they show the same number.
          </div>
        </div>

        <AnnualBreakdownTable vals={vals} holdYears={vals.hold_years} />

        <p
          style={{
            marginTop: "16px",
            fontSize: "11px",
            color: "#475569",
            lineHeight: 1.6,
            textAlign: "center",
          }}
        >
          For informational purposes only. Not financial, tax, or investment advice.
        </p>
      </div>
    </div>
  );
}
