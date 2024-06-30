import { useContext, useState } from "react";
import { DictionaryContext } from "../../Context/DictionaryContext";

import "./index.scss";

interface ITextAreaNotes {
  note?: string;
}

export const TextAreaNotes = ({ note }: ITextAreaNotes) => {
  const { dictionary } = useContext(DictionaryContext);

  const [textAreaNote, setTextAreaNote] = useState<string>(note || "");

  return (
    <div className="text-area-notes-wrapper">
      <textarea
        placeholder={dictionary.HeadersForm.notes}
        rows={6}
        name="note"
        value={textAreaNote}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setTextAreaNote(event.target.value)}
      />
    </div>
  );
};
