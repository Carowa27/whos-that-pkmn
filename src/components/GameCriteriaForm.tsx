import { useNavigate } from "react-router-dom";

export const GameCriteriaForm = () => {
  const navigate = useNavigate();
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
  return (
    <>
      Choose your game criterias:
      <form onSubmit={(e) => handleGameCriterias(e)}>
        <select name="generation">
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
        <div>
          <label>
            <input type="radio" name="pkmnClue" value="img" />
            Img
          </label>
          <label>
            <input type="radio" name="pkmnClue" value="dexEntry" />
            PokeDex entry
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="pkmnAnswer" value="multipleChoices" />
            Multiple choices
          </label>
          <label>
            <input type="radio" name="pkmnAnswer" value="textInput" />
            Text input
          </label>
        </div>
        <button>Start guessing</button>
      </form>
    </>
  );
};
