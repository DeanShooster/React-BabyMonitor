import "./index.scss";

interface IImage {
  imageSrc: string;
  imageAlt?: string;
  margin?: {
    top?: number;
    bottom?: number;
  };
  className?: string;
  onClick?: Function;
}

export const Image = ({ imageSrc, imageAlt, margin, className, onClick }: IImage) => {
  return (
    <div
      className={`image-wrapper-cmp ${className || ""}`}
      style={
        margin
          ? {
              marginTop: margin.top,
              marginBottom: margin.bottom,
            }
          : undefined
      }
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <img alt={imageAlt || ""} src={imageSrc} />
    </div>
  );
};
