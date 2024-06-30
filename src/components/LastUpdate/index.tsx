import { useContext } from "react";
import { DictionaryContext } from "../../Context/DictionaryContext";
import { formatDateToDDMMYYYY } from "../../utils/date";

import "./index.scss";

interface ILastUpdate {
  date: Date | undefined;
}

export const LastUpdate = ({ date }: ILastUpdate) => {
  const { dictionary } = useContext(DictionaryContext);
  const { lastUpdate, missingInformation } = dictionary.General;

  return <p className={`last-update-date-wrapper ${date ? "has-date" : ""}`}>{date ? `${lastUpdate} ${formatDateToDDMMYYYY(new Date(date))}` : missingInformation}</p>;
};
