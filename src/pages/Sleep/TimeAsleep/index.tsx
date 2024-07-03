import { useContext, useEffect, useState } from "react";
import { DictionaryContext } from "../../../Context/DictionaryContext";

import { getTimeDiffInHHMMSS } from "../../../utils/date";

import "./index.scss";

interface ITimeAsleep {
  startTime: Date;
  endTime?: Date | undefined;
}

export const TimeAsleep = ({ startTime, endTime }: ITimeAsleep) => {
  const { dictionary } = useContext(DictionaryContext);

  const [__, setCurrentEndTime] = useState(endTime ? new Date(endTime) : new Date());

  const { sleepingBaby, stillAsleep, hours } = dictionary.HeadersForm;

  useEffect(() => {
    if (!endTime) {
      const clockInterval = setInterval(() => {
        setCurrentEndTime(new Date());
      }, 1000);

      return () => clearInterval(clockInterval);
    }
  }, [endTime]);

  return (
    <div className="time-asleep-wrapper">
      <span>{endTime ? sleepingBaby : stillAsleep}</span>
      <time>{getTimeDiffInHHMMSS(new Date(startTime), endTime ? new Date(endTime) : new Date())}</time>
      {endTime && <span>{hours}</span>}
    </div>
  );
};
