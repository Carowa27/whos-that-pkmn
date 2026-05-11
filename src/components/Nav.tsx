import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <Logo position="nav" />
      </Link>
      <Link to="/correct-guesses">Correct guesses</Link>
      <Link
        to="/disclaimer-info"
        id="disclaimer-icon"
        title="disclaimer information"
      >
        &#9432;
      </Link>
    </nav>
  );
};
