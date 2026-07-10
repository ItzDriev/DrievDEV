import React, { useEffect, useState } from "react";
import InputField from "../../../components/InputField";

interface Props {
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  helpShown: boolean;
  setHelpShown: (shown: boolean) => void;
  apiKey: string;
}

function CalendarSettings({ setApiKey, helpShown, setHelpShown }: Props) {
  const [input, setInput] = useState("");
  const [keyShown, setKeyShown] = useState(false);

  function handleSubmitApikey() {
    setApiKey(input);

    localStorage.setItem("apiKey", input);
  }

  useEffect(() => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey && apiKey !== "") {
      setInput(apiKey);
      setApiKey(apiKey);
    }
  }, []);

  return (
    <div className="flex flex-1 justify-center items-center mx-6 mt-10 h-10">
      <i
        className="text-[1.7rem] text-white cursor-pointer fa-solid fa-question fa-fw"
        onClick={() => {
          setHelpShown(!helpShown);
        }}
      />
      <InputField
        placeholder={"Enter your API-Key"}
        className="py-2 border-2 rounded-sm"
        type={keyShown ? "text" : "password"}
        onKeyDown="Enter"
        onKeyDownFunc={handleSubmitApikey}
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInput(e.target.value.trim());
        }}
      />
      {keyShown ? (
        <i
          className="ml-2 text-white text-xl cursor-pointer fa-fw fa-solid fa-eye"
          onClick={() => {
            setKeyShown(false);
          }}
        />
      ) : (
        <i
          className="ml-2 text-white text-xl cursor-pointer fa-fw fa-sharp fa-solid fa-eye-slash"
          onClick={() => {
            setKeyShown(true);
          }}
        />
      )}
    </div>
  );
}

export default CalendarSettings;
