import { useContext } from "react";
import { DictionaryContext } from "../../../Context/DictionaryContext";
import { IDiaper, IFeed, IMonitor, ISleep } from "../../../Context/BabyContext";
import { extractDate } from "../../../utils/babyUtil";
import { formatDateToDDMMYYYY } from "../../../utils/date";
import { LAPTOP_VIEW } from "../../../constants";
import { useWindowSize } from "../../../Hooks/useWindowSize";

import { GeneralNote } from "../../Home/BabyDailyStats/Journal/GeneralNote";

import "./index.scss";
import { ArrowLeft, BabyBottle, Bed, BreastFeed, Pee, Poop } from "../../../assets";
import { Image } from "../../../components/Image";

interface IDailyJournal {
  monitor: IMonitor;
}

export const DailyJournal = ({ monitor }: IDailyJournal) => {
  const { dictionary } = useContext(DictionaryContext);

  const { diapers, sleep } = dictionary.Home;

  const windowSize = useWindowSize();

  const updates = [...monitor.diapers, ...monitor.feeding, ...monitor.sleep];
  updates
    .sort((babyItemOne: IDiaper | IFeed | ISleep, babyItemTwo: IDiaper | IFeed | ISleep) => extractDate(babyItemTwo).getTime() - extractDate(babyItemOne).getTime())
    .reverse();

  return (
    <div className="daily-journal-container">
      <h2>{formatDateToDDMMYYYY(new Date(monitor.date))}</h2>
      <div className="full-journal-container">
        {updates.map((item: any, index: number) => {
          let img = "",
            title = "";
          if ("isPee" in item) {
            img = item.isPee ? Pee : Poop;
            title = diapers;
          } else if ("isBottle" in item) {
            img = item.isBottle ? BabyBottle : BreastFeed;
            title = dictionary.Journal.singleFeed;
          } else {
            img = Bed;
            title = sleep;
          }
          return (
            <>
              <GeneralNote key={index} className="general-note" note={item.note} time={item.time || item.startTime} img={img} title={title} />
              {index < updates.length - 1 && <Image imageSrc={ArrowLeft} className={windowSize <= LAPTOP_VIEW ? "mobile-arrow-image" : undefined} />}
            </>
          );
        })}
      </div>
    </div>
  );
};
