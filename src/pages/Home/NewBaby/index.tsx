import { useContext, useState } from "react";
import { BabyContext, IBaby } from "../../../Context/BabyContext";

import { Modal } from "../../../components/Modal";
import { DictionaryContext } from "../../../Context/DictionaryContext";

import "./index.scss";
import { BabyInformationForm } from "./BabyInformationForm";
import { BabyAvatarForm } from "./BabyAvatarForm";

export const NewBaby = () => {
  const { baby, setBaby } = useContext(BabyContext);
  const { dictionary } = useContext(DictionaryContext);

  const [updatedBaby, setUpdatedBaby] = useState<IBaby | null>(baby);

  const [step, setStep] = useState<number>(0);
  const steps = [
    <BabyInformationForm nextStep={() => setStep(step + 1)} setUpdatedBaby={setUpdatedBaby} />,
    <BabyAvatarForm nextStep={() => setBaby(updatedBaby)} setUpdatedBaby={setUpdatedBaby} />,
  ];

  if (baby?.information.birthDate) return null;

  return (
    <Modal>
      <div className="new-baby-notice-container">
        <h1>{`${dictionary.Home.welcome} ${baby?.motherName}`}</h1>
        <p>{dictionary.Home.newBabyNotice}</p>
        {steps[step]}
      </div>
    </Modal>
  );
};
