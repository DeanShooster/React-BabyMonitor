import { CSSProperties, FC } from "react";

import "./index.scss";

interface IModal {
  children: React.ReactNode;
  style?: CSSProperties;
}

export const Modal: FC<IModal> = (props) => {
  return (
    <div className="modal-wall">
      <div className="modal-paper" style={props.style}>
        {props.children}
      </div>
    </div>
  );
};
