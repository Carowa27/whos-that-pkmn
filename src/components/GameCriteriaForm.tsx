import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGenerations } from "../api/getPkmn";

interface GameCriteriaFormProps {
  error: { error: boolean; msg: string };
  setError: React.Dispatch<
    React.SetStateAction<{ error: boolean; msg: string }>
  >;
}
export const GameCriteriaForm = ({
  error,
  setError,
}: GameCriteriaFormProps) => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    generation: "",
    clueType: "",
    alternativeType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target;

    if (!target.name) return;

    setFormState((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleGameCriterias = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    navigate(
      `/game/${formState.generation}/${formState.clueType}/${formState.alternativeType}/`,
    );
  };

  const isFormValid = Boolean(
    formState.generation && formState.clueType && formState.alternativeType,
  );

  return (
    <form onSubmit={handleGameCriterias} id="game-criteria-form">
      <h4>Choose your game criterias:</h4>

      <select
        name="generation"
        value={formState.generation}
        onChange={handleChange}
      >
        <option value="" disabled hidden>
          Select Gen or All
        </option>
        <option value="nat">National PokeDex</option>
        <option value="gen1">Gen 1</option>
        <option value="gen2">Gen 2</option>
        <option value="gen3">Gen 3</option>
        <option value="gen4">Gen 4</option>
        <option value="gen5">Gen 5</option>
        <option value="gen6">Gen 6</option>
        <option value="gen7">Gen 7</option>
        <option value="gen8">Gen 8</option>
        <option value="gen9">Gen 9</option>
      </select>

      <div id="clue-section">
        <label className="button">
          <input
            type="radio"
            name="clueType"
            value="img"
            checked={formState.clueType === "img"}
            onChange={handleChange}
          />
          Image
        </label>

        <label className="button">
          <input
            type="radio"
            name="clueType"
            value="dex"
            checked={formState.clueType === "dex"}
            onChange={handleChange}
          />
          PokeDex entry
        </label>
      </div>

      <div id="answer-section">
        <label className="button">
          <input
            type="radio"
            name="alternativeType"
            value="multiple"
            checked={formState.alternativeType === "multiple"}
            onChange={handleChange}
          />
          Multiple choices
        </label>

        <label className="button">
          <input
            type="radio"
            name="alternativeType"
            value="text"
            disabled
            title="not added yet"
            checked={formState.alternativeType === "text"}
            onChange={handleChange}
          />
          Text input
        </label>
      </div>

      <button disabled={!isFormValid}>Start guessing</button>
    </form>
  );
};
