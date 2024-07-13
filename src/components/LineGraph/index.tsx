import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { NoGraphData } from "./NoGraphData";

import "./index.scss";
import { Image } from "../Image";

export interface IData {
  step: number | string;
  value: number;
}

interface ILineGraph {
  title: string;
  titleImg?: string;
  data: IData[];
}

export const LineGraph = ({ title, titleImg, data }: ILineGraph) => {
  const graphStyle = {
    stroke: "#8996a4",
  };

  const lineStyle = {
    strokeWidth: 2,
    stroke: "rgb(98, 147, 255)",
    metaStroke: "rgb(229, 138, 0)",
    proStroke: "rgb(220, 38, 38)",
    dotRadius: 7,
  };

  return (
    <div className="generic-line-graph-card">
      <div className="title-and-progress">
        <h1>{title}</h1>
        {titleImg && <Image imageSrc={titleImg} />}
      </div>
      {data.length > 0 ? (
        <ResponsiveContainer height={200} className="responsive-graph-container">
          <LineChart data={data} margin={{ top: 10, right: 10 }}>
            <CartesianGrid strokeDasharray="1 5" strokeOpacity={0.5} vertical={false} />
            <XAxis dataKey="step" {...graphStyle} tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis {...graphStyle} tickLine={false} axisLine={false} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineStyle.stroke}
              strokeWidth={lineStyle.strokeWidth}
              dot={false}
              activeDot={{ r: lineStyle.dotRadius, fill: lineStyle.stroke, strokeWidth: 1 }}
            />
            <Tooltip
              cursor={{ stroke: graphStyle.stroke, opacity: 0.5 }}
              contentStyle={{
                backgroundColor: "rgb(19, 25, 32)",
                borderRadius: "5px",
                direction: "rtl",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <NoGraphData />
      )}
    </div>
  );
};
