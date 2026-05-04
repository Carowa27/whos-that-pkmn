import logo from "/logo.png";

interface ILogoProps {
  position: "frontpage" | "nav";
}

export const Logo = ({ position }: ILogoProps) => {
  return (
    <>
      <img
        src={logo}
        alt="who's that pkmn logo"
        width={position === "nav" ? 60 : 300}
      />
    </>
  );
};
