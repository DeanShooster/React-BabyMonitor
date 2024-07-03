import { useContext } from "react";
import { DictionaryContext } from "../../../Context/DictionaryContext";

import { AgeBar } from "./AgeBar";
import { Stats } from "./Stats";

import "./index.scss";
import { Image } from "../../../components/Image";
import { StatsGraph } from "../../../assets";

export const BabyDailyStats = () => {
  const { dictionary } = useContext(DictionaryContext);

  return (
    <div className="baby-daily-stats-container">
      <AgeBar />
      <div className="baby-daily-stats-wrapper">
        <Image imageSrc={StatsGraph} />
        <Stats />
      </div>
      <div className="journal">
        <button onClick={() => alert("UNDER CONSTRUCTION")}>{dictionary.Home.journalNotes}</button>
      </div>
    </div>
  );
};
