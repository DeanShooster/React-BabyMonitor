import { useContext } from "react";
import { DictionaryContext } from "../../../Context/DictionaryContext";

import "./index.scss";

export const NoGraphData = () => {
  const { dictionary } = useContext(DictionaryContext);

  return <div className="no-graph-data">{dictionary.General.missingInformation}</div>;
};
