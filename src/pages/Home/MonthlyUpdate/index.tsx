import { useContext, useState } from "react";
import { DictionaryContext } from "../../../Context/DictionaryContext";
import { BabyContext } from "../../../Context/BabyContext";
import { UpdateInformation } from "../../../API/Home";
import { MAX_BABY_HEIGHT, MAX_BABY_WEIGHT, MIN_BABY_HEIGHT, MIN_BABY_WEIGHT, TOKEN_NAME } from "../../../constants";

import { isBefore } from "../../../utils/date";
import { formDataGenerator } from "../../../utils/form";

import { BabyFormModal } from "../../../components/BabyFormModal";
import { ErrorMsg } from "../../../components/ErrorMsg";

import "./index.scss";
import { Image } from "../../../components/Image";
import { useLoader } from "../../../Hooks/useLoader";
import { Firework } from "../../../assets";

export const MonthlyUpdate = () => {
  const { dictionary } = useContext(DictionaryContext);
  const { baby, setBaby } = useContext(BabyContext);

  const { weight, height, monthlyUpdate } = dictionary.Home;
  const { noData, invalidWeight, invalidHeight, somethingWentWrong } = dictionary.Errors;

  const lastUpdated = new Date(baby?.information.lastUpdate!);
  lastUpdated.setDate(lastUpdated.getDate() + 30);

  const { isLoading, setIsLoading, loader } = useLoader({ size: 50, removeAbsolute: true });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!baby?.information.birthDate) return null;

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = formDataGenerator(event);

    const weight = Number(formData.weight);
    const height = Number(formData.height);

    if (!Object.values(formData).every((value: string) => value !== "")) {
      setErrorMsg(noData);
      return;
    }
    if (weight > MAX_BABY_WEIGHT || weight < MIN_BABY_WEIGHT) {
      setErrorMsg(invalidWeight);
      return;
    }
    if (height > MAX_BABY_HEIGHT || height < MIN_BABY_HEIGHT) {
      setErrorMsg(invalidHeight);
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);

    const token = localStorage.getItem(TOKEN_NAME);
    if (token) {
      const updateResult = await UpdateInformation({ weight, height, lastUpdate: new Date() }, token);
      if (updateResult.Error) setErrorMsg(somethingWentWrong);
      else setBaby(updateResult.babyMonitor);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isBefore(lastUpdated, new Date()) && (
        <BabyFormModal>
          <div className="title-container">
            <Image imageSrc={Firework} />
            <h1>{monthlyUpdate}</h1>
          </div>
          <form onSubmit={submitHandler}>
            <div>
              <label>{weight}</label>
              <input type="number" name="weight" />
            </div>
            <div>
              <label>{height}</label>
              <input type="number" name="height" />
            </div>
            {isLoading ? loader : <button>{dictionary.General.next}</button>}
          </form>
          {errorMsg && <ErrorMsg message={errorMsg} margin={{ top: 16 }} />}
        </BabyFormModal>
      )}
    </>
  );
};
