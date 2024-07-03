import { useContext } from "react";
import { LineGraph } from "../../../components/LineGraph";
import { DictionaryContext } from "../../../Context/DictionaryContext";

import "./index.scss";
import { BabyContext } from "../../../Context/BabyContext";

export const WeightHeightsGraphs = () => {
  const { baby } = useContext(BabyContext);
  const { dictionary } = useContext(DictionaryContext);
  const { weight, height } = dictionary.Home;

  let weightData = [],
    heightData = [];
  if (baby) {
    for (let i = 0; i < baby.information.weight.length; i++)
      weightData.push({
        step: i + 1,
        value: baby.information.weight[i],
      });
    for (let i = 0; i < baby.information.height.length; i++)
      heightData.push({
        step: i + 1,
        value: baby.information.height[i],
      });
  }

  return (
    <div className="weight-height-graphs-container">
      <LineGraph title={weight} data={weightData} />
      <LineGraph title={height} data={heightData} />
    </div>
  );
};
