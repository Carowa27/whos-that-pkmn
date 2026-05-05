import { useLocation } from "react-router-dom";

export const Loading = () => {
  const location = useLocation().pathname;
  console.log(location);
  return (
    <div id="loader-wrapper">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
        alt="pokeball loader animation"
        id="spinner"
        className={`${location === "/game" ? "throw-animation" : "spin-animation"}`}
      />
    </div>
  );
};
