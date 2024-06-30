import { useContext, useState } from "react";
import { BabyContext } from "../../Context/BabyContext";
import { DictionaryContext } from "../../Context/DictionaryContext";
import { MAX_INPUT_NAME_LENGTH, MIN_INPUT_NAME_LENGTH, TOKEN_NAME } from "../../constants";
import { isHebrew } from "../../utils/regex";
import { AppSign } from "../../API/Authentication";

import { formDataGenerator } from "../../utils/form";

import { ErrorMsg } from "../ErrorMsg";

import "./index.scss";
import { BabyFace } from "../../assets";
import { Image } from "../Image";
import { useLoader } from "../../Hooks/useLoader";

export const LoginRegister = () => {
  const { dictionary } = useContext(DictionaryContext);
  const { setBaby } = useContext(BabyContext);
  const { login, register, mother, baby, password, next } = dictionary.General;
  const { noData, invalidLanguageName, somethingWentWrong, wrongCredentials } = dictionary.Errors;

  const { isLoading, setIsLoading, loader } = useLoader({ size: 50, removeAbsolute: true });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = formDataGenerator(event);

    if (!Object.values(formData).every((value: string) => value !== "")) {
      setErrorMsg(noData);
      return;
    }
    if (!isHebrew(formData.motherName) || !isHebrew(formData.babyName)) {
      setErrorMsg(invalidLanguageName);
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);
    const signResult = await AppSign(formData);
    if (signResult.status === 401) setErrorMsg(wrongCredentials);
    else if (signResult.Error) setErrorMsg(somethingWentWrong);
    else {
      const { token, babyMonitor } = signResult;
      localStorage.setItem(TOKEN_NAME, token);
      setBaby(babyMonitor);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-register-modal">
      <h1>{`${login} / ${register}`}</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>{mother}</label>
          <input maxLength={MAX_INPUT_NAME_LENGTH} minLength={MIN_INPUT_NAME_LENGTH} name="motherName" />
        </div>
        <div>
          <label>{baby}</label>
          <input maxLength={MAX_INPUT_NAME_LENGTH} minLength={MIN_INPUT_NAME_LENGTH} name="babyName" />
        </div>
        <div>
          <label>{password}</label>
          <input type="password" maxLength={MAX_INPUT_NAME_LENGTH} name="password" />
        </div>
        {isLoading ? loader : <button>{next}</button>}
      </form>
      {errorMsg && <ErrorMsg message={errorMsg} margin={{ top: 16 }} />}
      <Image imageSrc={BabyFace} margin={{ top: 16 }} />
    </div>
  );
};
