import "./index.scss";

interface ILoader {
  size: number;
  color?: string;
  removeAbsolute?: true;
}

export const Loader = ({ color, size, removeAbsolute }: ILoader) => {
  return (
    <div
      className={removeAbsolute ? "loader-wrapper" : "loader-wrapper loader-absolute-center"}
      style={{
        width: size,
      }}
    >
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#fc6767" />
          </filter>
        </defs>
        <circle
          className="spinner"
          style={{
            fill: "transparent",
            stroke: color || "white",
            strokeWidth: "7px",
            strokeLinecap: "round",
            filter: "url(#shadow)",
          }}
          cx="50"
          cy="50"
          r="45"
        />
      </svg>
    </div>
  );
};
