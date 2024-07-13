import { useContext } from "react";
import { BabyContext } from "../../../../Context/BabyContext";
import { DictionaryContext } from "../../../../Context/DictionaryContext";

import "./index.scss";
import { Divider } from "../../../../components/Divider";
import { calculateSpecificAge } from "../../../../utils/date";

export const AgeBar = () => {
  const { baby } = useContext(BabyContext);
  const { dictionary } = useContext(DictionaryContext);

  const { dailyStats, singleYear, manyYears, singleMonth, manyMonths, singleDay, manyDays, age, and } = dictionary.Home;

  const { years, months, days } = baby?.information.birthDate ? calculateSpecificAge(baby?.information.birthDate) : { years: null, months: null, days: null };

  return (
    <div className="age-bar-container">
      <span>{dailyStats}</span>
      <Divider isVertical />
      <div>
        {`${baby?.babyName} ${age}`}
        {years && <span>{years === 1 ? `${singleYear}` : `${years} ${manyYears}`}</span>}{" "}
        {months && <span>{months === 1 ? `${singleMonth}` : `${months} ${manyMonths}`}</span>}{" "}
        {days && (
          <span>
            {and}
            {days === 1 ? `${singleDay}` : `${days} ${manyDays}`}
          </span>
        )}
      </div>
    </div>
  );
};
