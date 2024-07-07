import { createContext, useCallback, useEffect, useState } from "react";
import { TOKEN_NAME } from "../constants";
import { IsAuth } from "../API/Authentication";
import { useLoader } from "../Hooks/useLoader";

interface IBabyContext {
  baby: IBaby | null;
  setBaby: Function;
}

export interface IBaby {
  motherName: string;
  babyName: string;
  avatar: string;
  information: {
    weight: number[];
    height: number[];
    birthDate: Date | null;
    lastUpdate: Date | null;
  };
  monitor: IMonitor[];
}

export interface IMonitor {
  date: Date;
  feeding: IFeed[];
  diapers: IDiaper[];
  sleep: ISleep[];
}

export interface IFeed {
  time: Date;
  isBottle: boolean;
  note?: string;
}

export interface IDiaper {
  time: Date;
  isPee: boolean;
  note?: string;
}

export interface ISleep {
  startTime: Date;
  endTime?: Date;
  note?: string;
}

export const BabyContext = createContext<IBabyContext>({
  baby: null,
  setBaby: () => {},
});

export const BabyContextProvider = (props: any) => {
  const [baby, setBaby] = useState<IBaby | null>(null);
  const { isLoading, setIsLoading, loader } = useLoader({ size: 200 });

  const initBaby = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_NAME);
    if (token) {
      setIsLoading(true);
      const result = await IsAuth(token);
      if (!result.Error) setBaby(result.babyMonitor);
      else localStorage.removeItem(TOKEN_NAME);
      setIsLoading(false);
    }
  }, [setIsLoading]);

  useEffect(() => {
    initBaby();
  }, [initBaby]);

  return <BabyContext.Provider value={{ baby, setBaby }}>{isLoading ? loader : props.children}</BabyContext.Provider>;
};
