import "./index.scss";
import { Image } from "../../Image";
import { Film } from "../../../assets";

export const Logo = () => {
  return (
    <div className="app-logo" onClick={() => alert("WORK IN PROGRESS")}>
      <Image imageSrc={Film} />
    </div>
  );
};
