import { useContext } from "react";
import { DictionaryContext } from "../../Context/DictionaryContext";

import "./index.scss";

export const TextAreaNotes = () => {
  const { dictionary } = useContext(DictionaryContext);
  return (
    <div className="text-area-notes-wrapper">
      <textarea placeholder={dictionary.HeadersForm.notes} rows={6} name="note"></textarea>
    </div>
  );
};
