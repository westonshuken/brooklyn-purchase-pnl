const urlInputStyle = {
  background: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "6px",
  color: "#f1f5f9",
  padding: "10px 12px",
  width: "100%",
  fontSize: "13px",
  fontFamily: "inherit",
  minHeight: "40px",
};

export default function ListingSection({ listingUrl, updateField }) {
  const trimmed = listingUrl.trim();
  const isValidUrl = trimmed.startsWith("http://") || trimmed.startsWith("https://");

  return (
    <div
      style={{
        background: "#0b1120",
        border: "1px solid #1e293b",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          letterSpacing: "2px",
          color: "#60a5fa",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        Listing
      </div>
      <input
        type="url"
        placeholder="Paste listing URL (StreetEasy, Zillow, etc.)"
        value={listingUrl}
        onChange={(e) => updateField("listing_url", e.target.value)}
        style={urlInputStyle}
        className="listing-url-input"
      />
      {isValidUrl && (
        <div style={{ marginTop: "10px", fontSize: "12px" }} className="listing-link-display">
          <a
            href={trimmed}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#60a5fa", wordBreak: "break-all" }}
            className="report-listing-link"
          >
            {trimmed}
          </a>
        </div>
      )}
    </div>
  );
}
