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
        className={`logo-dark logo-${position}`}
        alt="who's that pkmn logo"
        width={position === "nav" ? 60 : 250}
      />
      <img
        src={logowht}
        className={`logo-light logo-${position}`}
        alt="who's that pkmn logo"
        width={position === "nav" ? 60 : 250}
      />
    </>
  );
};
