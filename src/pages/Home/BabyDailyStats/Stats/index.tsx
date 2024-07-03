import { useContext } from "react";
import { BabyContext } from "../../../../Context/BabyContext";
import { DictionaryContext } from "../../../../Context/DictionaryContext";

import { isSameDay } from "../../../../utils/date";

import { GenericStat } from "./GenericStat";

import "./index.scss";
import { BabyBottle, Bed, Diaper } from "../../../../assets";

interface IBabyStat {
  title: string;
  img: string;
  amount: number;
}

export const Stats = () => {
  const { baby } = useContext(BabyContext);
  const { dictionary } = useContext(DictionaryContext);
  const { noDailyStats, feeding, diapers, sleep } = dictionary.Home;

  const lastMonitorItem = baby?.monitor[baby?.monitor.length - 1];

  if (lastMonitorItem?.date && !isSameDay(new Date(lastMonitorItem.date), new Date())) return <div>{noDailyStats}</div>;

  const babyStats: IBabyStat[] = [
    {
      title: feeding,
      img: BabyBottle,
      amount: lastMonitorItem?.feeding.length || 0,
    },
    {
      title: diapers,
      img: Diaper,
      amount: lastMonitorItem?.diapers.length || 0,
    },
    {
      title: sleep,
      img: Bed,
      amount: lastMonitorItem?.sleep.length || 0,
    },
  ];

  return (
    <div className="stats-container">
      {babyStats.map((statItem, index: number) => {
        return <GenericStat key={index} {...statItem} />;
      })}
    </div>
  );
};
