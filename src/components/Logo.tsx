import logoblk from "/logo-blk.png";
import logowht from "/logo-wht.png";

interface ILogoProps {
  position: "frontpage" | "nav";
}

export const Logo = ({ position }: ILogoProps) => {
  return (
    <>
      <img
        src={logoblk}
        id={`logo-${position}`}
        className="logo-dark"
        alt="who's that pkmn logo"
        width={position === "nav" ? 60 : 250}
      />
      <img
        src={logowht}
        id={`logo-${position}`}
        className="logo-light"
        alt="who's that pkmn logo"
        width={position === "nav" ? 60 : 250}
      />
    </>
  );
};
