import { PkmnClue } from "../components/PkmnClue";
import { PkmnGuessInput } from "../components/PkmnGuessInput";

export const Game = () => {
  return (
    <>
      <h2>Who's that Pkmn?</h2>
      <PkmnClue />
      <PkmnGuessInput />
    </>
  );
};
