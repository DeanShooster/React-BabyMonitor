import "./index.scss";

interface IDivider {
  isVertical: boolean;
}

export const Divider = ({ isVertical }: IDivider) => {
  return <div className={isVertical ? "vertical-divider" : undefined} />;
};
