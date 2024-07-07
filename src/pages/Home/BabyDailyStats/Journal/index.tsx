import { useContext } from "react";
import { DictionaryContext } from "../../../../Context/DictionaryContext";
import { BabyContext, IDiaper, IFeed, ISleep } from "../../../../Context/BabyContext";

import { Modal } from "../../../../components/Modal";
import { GeneralNote } from "./GeneralNote";

import "./index.scss";
import { Image } from "../../../../components/Image";
import { BabyBottle, Bed, BreastFeed, Pee, Poop, X } from "../../../../assets";

type IBabyStat = IDiaper | IFeed | ISleep;

interface IJournal {
  closeModal: Function;
}

export const Journal = ({ closeModal }: IJournal) => {
  const { dictionary } = useContext(DictionaryContext);
  const { baby } = useContext(BabyContext);

  if (!baby) return null;

  const { diapers, feeding, sleep, noDailyStats } = dictionary.Home;

  const extractDate = (item: IBabyStat) => {
    if ("time" in item) return new Date(item.time);
    else if ("startTime" in item) return new Date(item.startTime);
    return new Date();
  };

  const lastMonitorItem = baby.monitor[baby.monitor.length - 1];

  const updates = lastMonitorItem ? [...lastMonitorItem.diapers, ...lastMonitorItem.feeding, ...lastMonitorItem.sleep] : [];
  updates.sort((babyItemOne: IBabyStat, babyItemTwo: IBabyStat) => extractDate(babyItemTwo).getTime() - extractDate(babyItemOne).getTime());

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
      <div className="notes-container">
        {updates.length > 0 ? (
          updates.map((item: any, index: number) => {
            let img = "",
              title = "";
            if ("isPee" in item) {
              img = item.isPee ? Pee : Poop;
              title = diapers;
            } else if ("isBottle" in item) {
              img = item.isBottle ? BabyBottle : BreastFeed;
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
    </Modal>
  );
};
