import { useContext } from "react";
import { DictionaryContext } from "../../../Context/DictionaryContext";
import { BabyContext } from "../../../Context/BabyContext";

import { GenericStat } from "./GenericStat";

import "./index.scss";

export const WeeklyStats = () => {
  const { baby } = useContext(BabyContext);
  const { dictionary } = useContext(DictionaryContext);
  const { weeklyStatsTitle } = dictionary.Home;

  return (
    <div className="weekly-baby-stats-container">
      <h1>{weeklyStatsTitle}</h1>
      <GenericStat />
    </div>
  );
};
