import { useContext, useRef, useState } from "react";
import { DictionaryContext } from "../../../../Context/DictionaryContext";
import { FILE_TOO_LARGE_ERROR, TOKEN_NAME } from "../../../../constants";
import { UploadAvatar } from "../../../../API/Home";
import { STATUS_CODES } from "../../../../Enum/statusCodes";

import { ErrorMsg } from "../../../../components/ErrorMsg";

import "./index.scss";
import { Image } from "../../../../components/Image";
import { Upload } from "../../../../assets";
import { useLoader } from "../../../../Hooks/useLoader";

interface IBabyAvatarForm {
  nextStep: Function;
  setUpdatedBaby?: Function;
}

export const BabyAvatarForm = ({ nextStep, setUpdatedBaby }: IBabyAvatarForm) => {
  const { dictionary } = useContext(DictionaryContext);

  const hiddenInputFileRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { isLoading, setIsLoading, loader } = useLoader({ size: 50, removeAbsolute: true });

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hiddenInputFileRef.current?.files && hiddenInputFileRef.current.files[0]) {
      const formData = new FormData();
      formData.append("avatar", hiddenInputFileRef.current.files[0]);

      const token = localStorage.getItem(TOKEN_NAME);
      if (token) {
        setIsLoading(true);
        const result = await UploadAvatar(formData, token);
        if (result.Error) {
          if (result.status === STATUS_CODES.BAD_REQUEST || result.Error === FILE_TOO_LARGE_ERROR) setErrorMsg(dictionary.Errors.invalidFile);
        } else {
          if (setUpdatedBaby) setUpdatedBaby(result.babyMonitor);
          setErrorMsg(null);
          nextStep();
        }
      }
      setIsLoading(false);
    }
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
        {hiddenInputFileRef.current?.files && hiddenInputFileRef.current.files[0] && (
          <Image imageSrc={URL.createObjectURL(hiddenInputFileRef.current.files[0])} className="uploaded-image" />
        )}
        <Image imageSrc={Upload} />
      </button>
      {errorMsg && <ErrorMsg message={errorMsg} />}
      {isLoading ? loader : <button>{dictionary.General.next}</button>}
    </form>
  );
};
