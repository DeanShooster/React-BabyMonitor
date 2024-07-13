import { useContext } from "react";
import { DictionaryContext } from "../../../../../Context/DictionaryContext";

import { formatDateToHHMMSS } from "../../../../../utils/date";

import "./index.scss";
import { Image } from "../../../../../components/Image";

interface IGeneralNote {
  note?: string;
  time: Date;
  img: string;
  title: string;
  className?: string;
}

export const GeneralNote = ({ note, time, img, title, className }: IGeneralNote) => {
  const { dictionary } = useContext(DictionaryContext);

  return (
    <div className={className || "note-wrapper"}>
      <div>
        <div className="note-title">
          <h2>{title}</h2>
          <Image imageSrc={img} />
        </div>
        <time>{formatDateToHHMMSS(new Date(time))}</time>
      </div>
      <p>{note ? note : dictionary.Home.noDailyStats}</p>
    </div>
  );
};
