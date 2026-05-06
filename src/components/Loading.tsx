import { useLocation } from "react-router-dom";

export const Loading = () => {
  const location = useLocation().pathname;
  return (
    <div id="loader-wrapper">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
        alt="pokeball loader animation"
        id="spinner"
        className={`${location.includes("/game") ? "throw-animation" : "spin-animation"}`}
      />
    </div>
  );
};
