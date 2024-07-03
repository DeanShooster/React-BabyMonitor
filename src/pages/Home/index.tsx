import { Outlet } from "react-router";

import { NewBaby } from "./NewBaby";
import { BabyDailyStats } from "./BabyDailyStats";
import { WeightHeightsGraphs } from "./WeightHeightGraphs";
import { WeeklyStats } from "./WeeklyStats";

import "./index.scss";
import { Divider } from "../../components/Divider";

export const Home = () => {
  return (
    <section className="home-section">
      <NewBaby />
      <div className="baby-stats-container">
        <BabyDailyStats />
        <WeightHeightsGraphs />
        BABY % GRAPH
      </div>
      <Divider isVertical={false} margin={{ marginTop: 32, marginBottom: 32 }} />
      <WeeklyStats />
      <Outlet />
    </section>
  );
};
