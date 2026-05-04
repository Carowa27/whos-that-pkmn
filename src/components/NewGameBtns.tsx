import { Link } from "react-router-dom";

interface INewGameProps {
  startNewGame: () => void;
}

export const NewGameBtns = ({ startNewGame }: INewGameProps) => {
  return (
    <>
      <p>New game:</p>
      <section id="new-game-btn-section">
        <button>
          <Link to={"/"}>With new criterias</Link>
        </button>
        <button onClick={() => startNewGame()}>With same criterias</button>
      </section>
    </>
  );
};
