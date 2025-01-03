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
import { FEED } from "../../Enum/statusCodes";

import { Image } from "../../components/Image";
import { useLoader } from "../../Hooks/useLoader";
import { BabyBottle2, BreastFeed, Soup } from "../../assets";
import { UpdateFeedInformation } from "../../API/CategoriesUpdates";

export const Feed = () => {
  const { dictionary } = useContext(DictionaryContext);
  const { baby, setBaby } = useContext(BabyContext);

  const navigate = useNavigate();

  const [feed, setFeed] = useState<FEED>(FEED.REAL_FOOD);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { isLoading, setIsLoading, loader } = useLoader({ size: 50, removeAbsolute: true });

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = { note: formDataGenerator(event).note, feed, time: new Date() };
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
          <Image imageSrc={BreastFeed} onClick={() => setFeed(FEED.BREAST)} className={feed === FEED.BREAST ? "selected-img" : "not-selected-img"} />
          <Image imageSrc={BabyBottle2} onClick={() => setFeed(FEED.BOTTLE)} className={feed === FEED.BOTTLE ? "selected-img" : "not-selected-img"} />
          <Image imageSrc={Soup} onClick={() => setFeed(FEED.REAL_FOOD)} className={feed === FEED.REAL_FOOD ? "selected-img" : "not-selected-img"} />
        </div>
        <TextAreaNotes />
        {isLoading ? loader : <button>{dictionary.HeadersForm.update}</button>}
        {errorMsg && <ErrorMsg message={errorMsg} />}
      </form>
    </BabyFormModal>
  );
};
