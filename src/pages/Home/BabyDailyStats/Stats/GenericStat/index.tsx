import { MAX_STATS_IMAGE_VIEW } from "../../../../../constants";

import "./index.scss";
import { Image } from "../../../../../components/Image";
import { X } from "../../../../../assets";

interface IGenericStat {
  title: string;
  img: string;
  amount: number;
}

export const GenericStat = ({ title, img, amount }: IGenericStat) => {
  const statAmount = new Array(amount).fill("");

  return (
    <div className="generic-stat-wrapper">
      <span>{title}:</span>
      {amount === 0 ? (
        <Image imageSrc={X} />
      ) : (
        <div>
          {statAmount.map((_, index: number) => {
            if (index > MAX_STATS_IMAGE_VIEW) return null;
            return <Image key={index} imageSrc={img} />;
          })}
          {amount > MAX_STATS_IMAGE_VIEW ? "..." : null}
        </div>
      )}
    </div>
  );
};
