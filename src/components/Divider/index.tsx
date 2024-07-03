import "./index.scss";

interface IDivider {
  isVertical: boolean;
  margin?: {
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    MarginLeft?: number;
  };
}

export const Divider = ({ isVertical, margin }: IDivider) => {
  return <div className={isVertical ? "vertical-divider" : "horizontal-divider"} style={margin ? { ...margin } : undefined} />;
};
