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
    gameMode: "",
    generation: "",
    clueType: "",
    alternativeType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target;

    if (!target.name) return;
    if (target.value === "time-attack") {
      setFormState((prev) => ({
        ...prev,
        clueType: "",
        alternativeType: "",
        [target.name]: target.value,
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  const handleGameCriterias = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;
    if (formState.gameMode === "regular") {
      navigate(
        `/game/${formState.gameMode}/${formState.generation}/${formState.clueType}/${formState.alternativeType}/`,
      );
    }
    if (formState.gameMode === "time-attack") {
      navigate(`/game/${formState.gameMode}/${formState.generation}/`);
    }
  };

  const isFormValid = Boolean(
    (formState.gameMode == "regular" &&
      formState.generation &&
      formState.clueType &&
      formState.alternativeType) ||
    (formState.gameMode == "time-attack" && formState.generation),
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

      {/* {gameMode===} */}
      <div>
        <h5>Game mode:</h5>
        <div id="game-mode-section">
          <label className="button w-100">
            <input
              type="radio"
              name="gameMode"
              value="regular"
              checked={formState.gameMode === "regular"}
              onChange={handleChange}
            />
            Regular
          </label>
          <label className="button">
            <input
              type="radio"
              name="gameMode"
              value="time-attack"
              checked={formState.gameMode === "time-attack"}
              onChange={handleChange}
            />
            Time attack
          </label>
          <label className="button">
            <input
              type="radio"
              name="gameMode"
              value="shiny"
              checked={formState.gameMode === "shiny"}
              onChange={handleChange}
              disabled
            />
            Am I Shiny?
          </label>
        </div>
      </div>
      {error.error && (
        <p>
          There was an error:{error.msg}.<br />
          Refresh the page or go with National Pokedex.
        </p>
      )}
      <div>
        <h5>Generation:</h5>
        <div id="gen-section">
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
        </div>
      </div>
      {formState.gameMode === "regular" && (
        <>
          <div>
            <h5>Type of clue:</h5>
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
          </div>
          <div>
            <h5>How do you want to answer:</h5>
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
          </div>
        </>
      )}

      <button disabled={!isFormValid}>Start guessing</button>
    </form>
  );
};
