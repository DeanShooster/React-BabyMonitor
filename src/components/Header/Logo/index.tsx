import { useNavigate } from "react-router";
import { routes } from "../../../Routes";

import "./index.scss";
import { Image } from "../../Image";
import { BabyFaceLogo, Stopwatch } from "../../../assets";

export const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="app-logo" onClick={() => navigate(routes.Home)}>
      <Image imageSrc={BabyFaceLogo} />
      <Image imageSrc={Stopwatch} />
    </div>
  );
};
