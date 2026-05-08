import { GameCriteriaForm } from "../components/GameCriteriaForm";
import { Logo } from "../components/Logo";

interface HomeProps {
  error: { error: boolean; msg: string };
  setError: React.Dispatch<
    React.SetStateAction<{ error: boolean; msg: string }>
  >;
}

export const Home = ({ error, setError }: HomeProps) => {
  return (
    <>
      <Logo position="frontpage" />
      <GameCriteriaForm error={error} setError={setError} />
    </>
  );
};
