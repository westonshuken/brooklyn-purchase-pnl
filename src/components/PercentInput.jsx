const inputStyle = {
  background: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "4px",
  color: "#94a3b8",
  padding: "8px 6px",
  minHeight: "36px",
  width: "52px",
  textAlign: "right",
  fontSize: "12px",
  fontFamily: "inherit",
};

export default function PercentInput({ value, onChange, min = 0, max = 100, step = 0.5 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginLeft: "8px" }}>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        style={inputStyle}
      />
      <span style={{ color: "#475569", fontSize: "12px" }}>%</span>
    </span>
  );
}
