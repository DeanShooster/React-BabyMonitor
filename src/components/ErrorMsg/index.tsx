import "./index.scss";

interface IErrorMsg {
  message: string;
  margin?: {
    top?: number;
    bottom?: number;
  };
}

export const ErrorMsg = ({ message, margin }: IErrorMsg) => {
  return (
    <p
      className="error-msg"
      style={
        margin
          ? {
              marginTop: margin.top,
              marginBottom: margin.bottom,
            }
          : undefined
      }
    >
      {message}
    </p>
  );
};
