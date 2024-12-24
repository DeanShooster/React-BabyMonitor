import { useContext } from "react";
import { DictionaryContext } from "../../../../Context/DictionaryContext";
import { BabyContext, IDiaper, IFeed, ISleep } from "../../../../Context/BabyContext";
import { isSameDay } from "../../../../utils/date";
import { extractDate } from "../../../../utils/babyUtil";

import { Modal } from "../../../../components/Modal";
import { GeneralNote } from "./GeneralNote";

import "./index.scss";
import { Image } from "../../../../components/Image";
import { BabyBottle, Bed, BreastFeed, Pee, Poop, Soup, X } from "../../../../assets";

interface IJournal {
  closeModal: Function;
}

export const Journal = ({ closeModal }: IJournal) => {
  const { dictionary } = useContext(DictionaryContext);
  const { baby } = useContext(BabyContext);

  if (!baby) return null;

  const { diapers, feeding, sleep, noDailyStats } = dictionary.Home;

  const lastMonitorItem = baby.monitor[baby.monitor.length - 1];

  const updates = lastMonitorItem ? [...lastMonitorItem.diapers, ...lastMonitorItem.feeding, ...lastMonitorItem.sleep] : [];
  updates.sort((babyItemOne: IDiaper | IFeed | ISleep, babyItemTwo: IDiaper | IFeed | ISleep) => extractDate(babyItemTwo).getTime() - extractDate(babyItemOne).getTime());

  return (
    <Modal
      style={{
        maxHeight: 700,
        minWidth: window.innerWidth < 500 ? 300 : 375,
        overflow: "auto",
      }}
    >
      <Image imageSrc={X} onClick={closeModal} className="close-journal-x" />
      <h1 className="journal-title">{dictionary.Home.dailyNotes}</h1>
      {isSameDay(new Date(lastMonitorItem.date), new Date()) ? (
        <div className="notes-container">
          {updates.length > 0 ? (
            updates.map((item: any, index: number) => {
              let img = "",
                title = "";
              if ("isPee" in item) {
                img = item.isPee ? Pee : Poop;
                title = diapers;
              } else if ("isBottle" in item) {
                img = item.isRealFood ? Soup : item.isBottle ? BabyBottle : BreastFeed;
                title = feeding;
              } else {
                img = Bed;
                title = sleep;
              }

              return <GeneralNote key={index} note={item.note} time={item.time || item.startTime} img={img} title={title} />;
            })
          ) : (
            <div className="no-data">{noDailyStats}</div>
          )}
        </div>
      ) : (
        <div className="no-data">{noDailyStats}</div>
      )}
    </Modal>
  );
};
