import { useContext } from "react";
import { BabyContext } from "../../../Context/BabyContext";

import "./index.scss";
import { Image } from "../../Image";
import { EmptyUserProfile } from "../../../assets";

export const BabyUser = () => {
  const { baby } = useContext(BabyContext);

  return (
    <div className="baby-user-container">
      <Image imageSrc={EmptyUserProfile} />
      <div className="baby-name-container">
        <span className="baby-name">{baby?.babyName}</span>
      </div>
    </div>
  );
};
