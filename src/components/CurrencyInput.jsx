const inputStyle = {
  background: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "4px",
  color: "#f1f5f9",
  padding: "8px 8px",
  minHeight: "36px",
  width: "120px",
  textAlign: "right",
  fontSize: "13px",
  fontFamily: "inherit",
};

export default function CurrencyInput({ value, onChange, step = 1, min = 0 }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
      <span style={{ color: "#64748b", fontSize: "13px" }}>$</span>
      <input
        type="number"
        value={value}
        min={min}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        style={inputStyle}
      />
    </div>
  );
}
