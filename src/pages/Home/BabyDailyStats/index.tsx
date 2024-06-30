import { AgeBar } from "./AgeBar";
import { Stats } from "./Stats";

import "./index.scss";
import { Image } from "../../../components/Image";

export const BabyDailyStats = () => {
  return (
    <div className="baby-daily-stats-container">
      <AgeBar />
      <div>
        <Image imageSrc="" />
        <Stats />
      </div>
    </div>
  );
};
