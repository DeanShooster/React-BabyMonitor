import "./index.scss";

interface IImage {
  imageSrc: string;
  imageAlt?: string;
  margin?: {
    top?: number;
    bottom?: number;
  };
}

export const Image = ({ imageSrc, imageAlt, margin }: IImage) => {
  return (
    <div
      className="image-wrapper-cmp"
      style={
        margin
          ? {
              marginTop: margin.top,
              marginBottom: margin.bottom,
            }
          : undefined
      }
    >
      <img alt={imageAlt || ""} src={imageSrc} />
    </div>
  );
};
