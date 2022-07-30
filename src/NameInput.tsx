import { useState } from "react";

interface NameInputProps {
  handleNameSubmit: (str: string) => void;
}

const NameInput = ({ handleNameSubmit }: NameInputProps) => {
  const [nameValue, setNameValue] = useState<string>("");

  return (
    <div className="name-input-wrap-wrap">
      <label className="name-input-label">
        Enter your name:
        <div className="name-input-wrap">
          <input
            className="name-input"
            onChange={(e) => setNameValue(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" ? handleNameSubmit(nameValue) : null
            }
          />
          <button
            className="name-input-button"
            onClick={() => handleNameSubmit(nameValue)}
          >
            Submit
          </button>
        </div>
      </label>
    </div>
  );
};

export default NameInput;
