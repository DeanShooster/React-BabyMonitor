import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { routes } from "../../Routes";
import { DictionaryContext } from "../../Context/DictionaryContext";
import { BabyContext } from "../../Context/BabyContext";
import { TOKEN_NAME } from "../../constants";

import { formDataGenerator } from "../../utils/form";

import { BabyFormModal } from "../../components/BabyFormModal";
import { LastUpdate } from "../../components/LastUpdate";
import { TextAreaNotes } from "../../components/TextAreaNotes";
import { ErrorMsg } from "../../components/ErrorMsg";

import { Image } from "../../components/Image";
import { useLoader } from "../../Hooks/useLoader";
import { BabyBottle2, BreastFeed } from "../../assets";
import { UpdateFeedInformation } from "../../API/CategoriesUpdates";

export const Feed = () => {
  const { dictionary } = useContext(DictionaryContext);
  const { baby, setBaby } = useContext(BabyContext);

  const navigate = useNavigate();

  const [isBottle, setIsBottle] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { isLoading, setIsLoading, loader } = useLoader({ size: 50, removeAbsolute: true });

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = { note: formDataGenerator(event).note, isBottle, time: new Date() };
    setErrorMsg(null);
    const token = localStorage.getItem(TOKEN_NAME);
    if (token) {
      setIsLoading(true);
      const result = await UpdateFeedInformation(formData, token);
      if (result.Error) {
        setErrorMsg(dictionary.Errors.somethingWentWrong);
      } else {
        setBaby(result.babyMonitor);
        setErrorMsg(null);
        navigate(routes.Home);
      }
      setIsLoading(false);
    }
  };

  return (
    <BabyFormModal>
      <LastUpdate date={baby?.monitor[baby?.monitor.length - 1]?.feeding[baby?.monitor[baby?.monitor.length - 1]?.feeding.length - 1]?.time} />
      <form onSubmit={submitHandler}>
        <div className="header-form-selector-images-container">
          <Image imageSrc={BreastFeed} onClick={() => setIsBottle(false)} className={isBottle ? "not-selected-img" : "selected-img"} />
          <Image imageSrc={BabyBottle2} onClick={() => setIsBottle(true)} className={isBottle ? "selected-img" : "not-selected-img"} />
        </div>
        <TextAreaNotes />
        {isLoading ? loader : <button>{dictionary.HeadersForm.update}</button>}
        {errorMsg && <ErrorMsg message={errorMsg} />}
      </form>
    </BabyFormModal>
  );
};
