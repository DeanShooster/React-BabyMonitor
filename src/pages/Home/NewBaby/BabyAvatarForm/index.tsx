import { useContext, useRef, useState } from "react";
import { DictionaryContext } from "../../../../Context/DictionaryContext";

import "./index.scss";
import { Image } from "../../../../components/Image";
import { Upload } from "../../../../assets";
import { UploadAvatar } from "../../../../API/Home";
import { TOKEN_NAME } from "../../../../constants";
import { useLoader } from "../../../../Hooks/useLoader";

interface IBabyAvatarForm {
  nextStep: Function;
  setUpdatedBaby: Function;
}

export const BabyAvatarForm = ({ nextStep, setUpdatedBaby }: IBabyAvatarForm) => {
  const { dictionary } = useContext(DictionaryContext);

  const hiddenInputFileRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const { isLoading, setIsLoading, loader } = useLoader({ size: 50, removeAbsolute: true });

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hiddenInputFileRef.current?.files) {
      const formData = new FormData();
      formData.append("avatar", hiddenInputFileRef.current.files[0]);

      const token = localStorage.getItem(TOKEN_NAME);
      if (token) {
        setIsLoading(true);
        const result = await UploadAvatar(formData, token);
        if (!result.Error) setUpdatedBaby(result.babyMonitor);
      }
      setIsLoading(false);
    }
    nextStep();
  };

  const uploadFileHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (hiddenInputFileRef) hiddenInputFileRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => setFileName(event.target.files ? event.target.files[0].name : null);

  return (
    <form onSubmit={submitHandler}>
      <input type="file" name="avatar" ref={hiddenInputFileRef} style={{ display: "none" }} onChange={handleFileChange} />
      <button className="upload-button" onClick={uploadFileHandler}>
        <span>{fileName || dictionary.General.uploadFile}</span>
        <Image imageSrc={Upload} />
      </button>
      {isLoading ? loader : <button>{dictionary.General.next}</button>}
    </form>
  );
};
