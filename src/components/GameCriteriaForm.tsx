import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getGenerationData, getGenerations } from "../api/getPkmn";

interface GameCriteriaFormProps {
  error: { error: boolean; msg: string };
  setError: React.Dispatch<
    React.SetStateAction<{ error: boolean; msg: string }>
  >;
}

interface RegionData {
  genNr: number;
  region: string;
}
export const GameCriteriaForm = ({
  error,
  setError,
}: GameCriteriaFormProps) => {
  const navigate = useNavigate();
  const didFetch = useRef(false);

  const [gen, setGen] = useState<RegionData[]>([]);
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
  const generationData = async () => {
    try {
      const results = await getGenerations();

      const data: RegionData[] = [];

      for (let genNr = 1; genNr <= results.count; genNr++) {
        const response = await getGenerationData(genNr);

        data.push({
          genNr,
          region: response,
        });
      }

      setGen(data);
    } catch (error) {
      setError({
        error: true,
        msg: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    generationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleGameCriterias} id="game-criteria-form">
      <h4>Choose your game criterias:</h4>
      {error.error && (
        <p>
          There was an error:{error.msg}.<br />
          Refresh the page or go with National Pokedex.
        </p>
      )}
      <select
        name="generation"
        value={formState.generation}
        onChange={handleChange}
      >
        <option value="" disabled hidden>
          Select Gen or All
        </option>
        <option value="nat">National PokeDex</option>
        {gen &&
          gen.map((g: RegionData) => (
            <option key={`gen${g.genNr}`} value={`gen${g.genNr}`}>
              Gen {g.genNr} -{" "}
              {g.region.charAt(0).toUpperCase() + g.region.slice(1)}
            </option>
          ))}
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
