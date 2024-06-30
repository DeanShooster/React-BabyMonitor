import { useContext, useState } from "react";
import { BabyContext } from "../../../Context/BabyContext";

import { Modal } from "../../Modal";
import { BabyAvatarForm } from "../../../pages/Home/NewBaby/BabyAvatarForm";

import "./index.scss";
import { Image } from "../../Image";
import { EmptyUserProfile, X } from "../../../assets";

export const BabyUser = () => {
  const { baby, setBaby } = useContext(BabyContext);
  const [uploadAvatar, setUploadAvatar] = useState<boolean>(false);

  return (
    <>
      <div className="baby-user-container">
        <Image imageSrc={baby?.avatar ? `data:image/png;base64,${baby.avatar}` : EmptyUserProfile} onClick={() => setUploadAvatar(true)} />
        <div className="baby-name-container">
          <span className="baby-name">{baby?.babyName}</span>
        </div>
      </div>
      {uploadAvatar && (
        <Modal>
          <Image imageSrc={X} onClick={() => setUploadAvatar(false)} className="x-close-modal-icon" />
          <BabyAvatarForm nextStep={() => setUploadAvatar(false)} setUpdatedBaby={setBaby} />
        </Modal>
      )}
    </>
  );
};
