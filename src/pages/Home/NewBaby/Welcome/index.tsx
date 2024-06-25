import { useContext } from "react";
import { Image } from "../../../../components/Image";
import { DictionaryContext } from "../../../../Context/DictionaryContext";

import "./index.scss";
import { SuccessMark } from "../../../../assets";

interface IWelcome {
  nextStep: Function;
}

export const Welcome = ({ nextStep }: IWelcome) => {
  const { dictionary } = useContext(DictionaryContext);

  return (
    <div className="welcome-container">
      <Image imageSrc={SuccessMark} />
      <p>{dictionary.Home.successSign}</p>
      <button onClick={() => nextStep()}>{dictionary.General.next}</button>
    </div>
  );
};
