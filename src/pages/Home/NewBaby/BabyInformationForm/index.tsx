import { useContext, useState } from "react";
import { DictionaryContext } from "../../../../Context/DictionaryContext";
import { MAX_BABY_AGE, MAX_BABY_HEIGHT, MAX_BABY_WEIGHT, MIN_BABY_HEIGHT, MIN_BABY_WEIGHT, TOKEN_NAME } from "../../../../constants";
import { UpdateInformation } from "../../../../API/Home";

import { getAgeInYear, isBefore } from "../../../../utils/date";
import { formDataGenerator } from "../../../../utils/form";

import { useLoader } from "../../../../Hooks/useLoader";
import { ErrorMsg } from "../../../../components/ErrorMsg";

import "./index.scss";

interface IBabyInformationForm {
  nextStep: Function;
  setUpdatedBaby: Function;
}

export const BabyInformationForm = ({ nextStep, setUpdatedBaby }: IBabyInformationForm) => {
  const { dictionary } = useContext(DictionaryContext);
  const { weight, height, birthDate } = dictionary.Home;
  const { noData, invalidWeight, invalidHeight, invalidBirthDate, somethingWentWrong } = dictionary.Errors;

  const { isLoading, setIsLoading, loader } = useLoader({ size: 50, removeAbsolute: true });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = formDataGenerator(event);

    const weight = Number(formData.weight);
    const height = Number(formData.height);
    const birthDate = new Date(formData.birthDate);

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
    if (getAgeInYear(birthDate) > MAX_BABY_AGE || isBefore(new Date(), birthDate)) {
      setErrorMsg(invalidBirthDate);
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);

    const token = localStorage.getItem(TOKEN_NAME);
    if (token) {
      const updateResult = await UpdateInformation({ weight, height, birthDate }, token);
      if (updateResult.Error) setErrorMsg(somethingWentWrong);
      else {
        setUpdatedBaby(updateResult.babyMonitor);
        nextStep();
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <label>{weight}</label>
          <input type="number" name="weight" />
        </div>
        <div>
          <label>{height}</label>
          <input type="number" name="height" />
        </div>
        <div>
          <label>{birthDate}</label>
          <input type="date" name="birthDate" />
        </div>
        {isLoading ? loader : <button>{dictionary.General.next}</button>}
      </form>
      {errorMsg && <ErrorMsg message={errorMsg} margin={{ top: 16 }} />}
    </>
  );
};
