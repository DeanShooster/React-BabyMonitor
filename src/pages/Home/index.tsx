import { Outlet } from "react-router";

import { NewBaby } from "./NewBaby";
import { BabyDailyStats } from "./BabyDailyStats";

import "./index.scss";

export const Home = () => {
  return (
    <section className="home-section">
      <NewBaby />
      <div className="baby-stats-container">
        <BabyDailyStats />
      </div>
      <Outlet />
    </section>
  );
};
