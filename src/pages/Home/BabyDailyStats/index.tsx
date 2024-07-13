import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { routes } from "../../../Routes";
import { DictionaryContext } from "../../../Context/DictionaryContext";

import { AgeBar } from "./AgeBar";
import { Stats } from "./Stats";
import { Journal } from "./Journal";

import "./index.scss";
import { Image } from "../../../components/Image";
import { StatsGraph } from "../../../assets";

export const BabyDailyStats = () => {
  const { dictionary } = useContext(DictionaryContext);
  const { journalNotes, fullJournal } = dictionary.Home;

  const navigate = useNavigate();

  const [showJournal, setShowJournal] = useState<boolean>(false);

  return (
    <div className="baby-daily-stats-container">
      <AgeBar />
      <div className="baby-daily-stats-wrapper">
        <Image imageSrc={StatsGraph} />
        <Stats />
      </div>
      <div className="journal">
        <button onClick={() => setShowJournal(true)}>{journalNotes}</button>
        <button onClick={() => navigate(routes.Journal)}>{fullJournal}</button>
        {showJournal && <Journal closeModal={() => setShowJournal(false)} />}
      </div>
    </div>
  );
};
