import { FC } from "react";
import { useNavigate } from "react-router";
import { routes } from "../../Routes";

import { Modal } from "../Modal";

import "./index.scss";
import { Image } from "../Image";
import { X } from "../../assets";

export const BabyFormModal: FC<any> = (props) => {
  const navigate = useNavigate();

  return (
    <Modal>
      <Image imageSrc={X} onClick={() => navigate(routes.Home)} className="close-modal-icon" />
      {props.children}
    </Modal>
  );
};
