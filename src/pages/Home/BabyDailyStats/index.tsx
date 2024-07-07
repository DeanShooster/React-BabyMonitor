import { useContext, useState } from "react";
import { DictionaryContext } from "../../../Context/DictionaryContext";

import { AgeBar } from "./AgeBar";
import { Stats } from "./Stats";
import { Journal } from "./Journal";

import "./index.scss";
import { Image } from "../../../components/Image";
import { StatsGraph } from "../../../assets";

export const BabyDailyStats = () => {
  const { dictionary } = useContext(DictionaryContext);
  const [showJournal, setShowJournal] = useState<boolean>(false);

  return (
    <div className="baby-daily-stats-container">
      <AgeBar />
      <div className="baby-daily-stats-wrapper">
        <Image imageSrc={StatsGraph} />
        <Stats />
      </div>
      <div className="journal">
        <button onClick={() => setShowJournal(true)}>{dictionary.Home.journalNotes}</button>
        {showJournal && <Journal closeModal={() => setShowJournal(false)} />}
      </div>
    </div>
  );
};
