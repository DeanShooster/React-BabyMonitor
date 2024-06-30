import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { routes } from "../../Routes";
import { DictionaryContext } from "../../Context/DictionaryContext";
import { BabyContext } from "../../Context/BabyContext";
import { UpdateSleepInformation } from "../../API/CategoriesUpdates";

import { formDataGenerator } from "../../utils/form";

import { BabyFormModal } from "../../components/BabyFormModal";
import { ErrorMsg } from "../../components/ErrorMsg";
import { LastUpdate } from "../../components/LastUpdate";
import { TextAreaNotes } from "../../components/TextAreaNotes";

import "./index.scss";
import { useLoader } from "../../Hooks/useLoader";
import { TOKEN_NAME } from "../../constants";

export const Sleep = () => {
  const { dictionary } = useContext(DictionaryContext);
  const { baby, setBaby } = useContext(BabyContext);

  const navigate = useNavigate();

  const [isStart, setIsStart] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { isLoading, setIsLoading, loader } = useLoader({ size: 50, removeAbsolute: true });

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const time = isStart ? { startTime: new Date() } : { endTime: new Date() };
    const formData = { note: formDataGenerator(event).note, ...time };
    setErrorMsg(null);
    const token = localStorage.getItem(TOKEN_NAME);
    if (token) {
      setIsLoading(true);
      const result = await UpdateSleepInformation(formData, token);
      if (result.Error) {
        // error msg
      } else {
        // setBaby(result.babyMonitor);
        setErrorMsg(null);
        // navigate(routes.Home);
      }
      setIsLoading(false);
    }
  };

  return (
    <BabyFormModal>
      <LastUpdate date={undefined} />
      <form onSubmit={submitHandler}>
        <div className="start-end-container">
          <div>
            <input
              type="radio"
              readOnly
              checked={isStart}
              onClick={() => {
                if (!isStart) setIsStart(!isStart);
              }}
            />
            <label>{dictionary.HeadersForm.start}</label>
          </div>
          <div>
            <input
              type="radio"
              readOnly
              checked={!isStart}
              onClick={() => {
                if (isStart) setIsStart(!isStart);
              }}
            />
            <label>{dictionary.HeadersForm.end}</label>
          </div>
        </div>
        <TextAreaNotes />
        {isLoading ? loader : <button>{dictionary.HeadersForm.update}</button>}
        {errorMsg && <ErrorMsg message={errorMsg} />}
      </form>
    </BabyFormModal>
  );
};
