import { IDiaper, IFeed, ISleep } from "../Context/BabyContext";

export const extractDate = (item: IDiaper | IFeed | ISleep) => {
  if ("time" in item) return new Date(item.time);
  else if ("startTime" in item) return new Date(item.startTime);
  return new Date();
};
