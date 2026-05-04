import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const GameCriteriaForm = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    generation: "",
    pkmnClue: "",
    pkmnAnswer: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const target = e.target;

    if (!target.name) return;

    setFormState((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleGameCriterias = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const gameCriteria = {
      generation: formData.get("generation"),
      pkmnClue: formData.get("pkmnClue"),
      pkmnAnswer: formData.get("pkmnAnswer"),
    };

    navigate("/game", {
      state: { gameCriteria },
    });
  };

  const isFormValid =
    formState.generation && formState.pkmnClue && formState.pkmnAnswer;

  return (
    <form
      onSubmit={handleGameCriterias}
      onChange={handleChange}
      id="game-criteria-form"
    >
      <h4>Choose your game criterias:</h4>

      <select name="generation" defaultValue="">
        <option value="">Select Gen or All</option>
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
          <input type="radio" name="pkmnClue" value="img" />
          Img
        </label>

        <label className="button">
          <input type="radio" name="pkmnClue" value="dexEntry" />
          PokeDex entry
        </label>
      </div>

      <div id="answer-section">
        <label className="button">
          <input type="radio" name="pkmnAnswer" value="multipleChoices" />
          Multiple choices
        </label>

        <label className="button">
          <input type="radio" name="pkmnAnswer" value="textInput" />
          Text input
        </label>
      </div>

      <button disabled={!isFormValid}>Start guessing</button>
    </form>
  );
};
