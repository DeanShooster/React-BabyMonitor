import { useContext } from "react";
import { useNavigate } from "react-router";
import { routes } from "../../Routes";
import { DictionaryContext } from "../../Context/DictionaryContext";
import { BabyContext, IMonitor } from "../../Context/BabyContext";

import "./index.scss";
import { Image } from "../../components/Image";
import { ArrowRight, Heart } from "../../assets";
import { DailyJournal } from "./DailyJournal";
import { Divider } from "../../components/Divider";

export const Journal = () => {
  const { dictionary } = useContext(DictionaryContext);
  const { baby } = useContext(BabyContext);

  const { history } = dictionary.Journal;

  const navigate = useNavigate();

  const monitor = baby ? [...baby.monitor] : [];

  return (
    <section className="journal-page">
      <Image imageSrc={ArrowRight} className="nav-back-icon" onClick={() => navigate(routes.Home)} />
      <h1>
        <Image imageSrc={Heart} className="heart-animation" />
        {`${history} ${baby?.babyName}`}
        <Image imageSrc={Heart} className="heart-animation" />
      </h1>
      {monitor.reverse().map((monitorItem: IMonitor, index: number) => {
        return (
          <>
            <DailyJournal key={index} monitor={monitorItem} />
            {index < monitor.length - 1 && <Divider isVertical={false} margin={{ marginTop: 24 }} />}
          </>
        );
      })}
    </section>
  );
};
