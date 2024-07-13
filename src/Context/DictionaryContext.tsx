import { createContext, useCallback, useEffect, useState } from "react";
import { HebrewDictionary } from "../Dictionary";

const defaultDictionary: IDictionary = {
  General: {},
  Errors: {},
  Home: {},
  HeadersForm: {},
  Journal: {},
};

export interface IDictionary {
  General: { [key: string]: string };
  Errors: { [key: string]: string };
  Home: { [key: string]: string };
  HeadersForm: { [key: string]: string };
  Journal: { [key: string]: string };
}

interface IDictionaryContext {
  dictionary: IDictionary;
}

export const DictionaryContext = createContext<IDictionaryContext>({
  dictionary: {
    ...defaultDictionary,
  },
});

export const DictionaryContextProvider = (props: any) => {
  const [dictionary, setDictionary] = useState<IDictionary>({
    ...defaultDictionary,
  });

  const initDictionary = useCallback(() => {
    setDictionary(HebrewDictionary);
  }, []);

  useEffect(() => {
    initDictionary();
  }, [initDictionary]);

  return <DictionaryContext.Provider value={{ dictionary }}>{props.children}</DictionaryContext.Provider>;
};
