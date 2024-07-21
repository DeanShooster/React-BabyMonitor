import { useContext } from "react";
import { DictionaryContext } from "../../../Context/DictionaryContext";
import { BabyContext, IMonitor, ISleep } from "../../../Context/BabyContext";
import { IData, LineGraph } from "../../../components/LineGraph";

import { formatDateToDDMMYYYY, isBefore, timeDifference } from "../../../utils/date";

import "./index.scss";
import { BabyBottle, Bed, Diaper } from "../../../assets";

interface IGraphData {
  title: string;
  titleImg?: string;
  data: IData[];
}

export const WeeklyStats = () => {
  const { baby } = useContext(BabyContext);
  const { dictionary } = useContext(DictionaryContext);
  const { weeklyStatsTitle, feeding, diapers, sleep } = dictionary.Home;

  if (!baby) return null;

  const totalDailySleepCalculator = (sleep: ISleep[]) => {
    let totalSleep = 0;
    for (let i = 0; i < sleep.length; i++)
      if (sleep[i].startTime && sleep[i].endTime !== undefined) totalSleep += timeDifference(new Date(sleep[i].startTime), new Date(sleep[i].endTime!));
    return totalSleep;
  };

  const lastWeekMonitor: IMonitor[] = [];

  const today = new Date();
  const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));

  for (let i = 0; i < baby.monitor.length; i++) {
    if (isBefore(new Date(baby.monitor[i].date), sevenDaysAgo)) continue;
    lastWeekMonitor.push(baby.monitor[i]);
  }

  const feedingData: IData[] = [],
    diaperData: IData[] = [],
    sleepData: IData[] = [];

  for (let i = 0; i < lastWeekMonitor.length; i++) {
    const monitorDate: string = formatDateToDDMMYYYY(new Date(lastWeekMonitor[i].date)).substring(0, 4);
    feedingData.push({
      step: monitorDate,
      value: lastWeekMonitor[i].feeding.length,
    });
    diaperData.push({
      step: monitorDate,
      value: lastWeekMonitor[i].diapers.length,
    });
    sleepData.push({
      step: monitorDate,
      value: Number(totalDailySleepCalculator(lastWeekMonitor[i].sleep).toFixed(2)),
    });
  }

  const graphsData: IGraphData[] = [
    {
      title: feeding,
      titleImg: BabyBottle,
      data: feedingData,
    },
    {
      title: diapers,
      titleImg: Diaper,
      data: diaperData,
    },
    {
      title: sleep,
      titleImg: Bed,
      data: sleepData,
    },
  ];

  return (
    <div className="weekly-baby-stats-container">
      <h1>{weeklyStatsTitle}</h1>
      <div className="weekly-graphs-container">
        {graphsData.map((graphItem: IGraphData, index: number) => {
          return <LineGraph key={index} title={graphItem.title} titleImg={graphItem.titleImg} data={graphItem.data} />;
        })}
      </div>
    </div>
  );
};
