import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/Nav";
import { Game } from "./pages/Game";
import { PkmnList } from "./pages/PkmnList";
import { Home } from "./pages/Home";
import { useState } from "react";
import type { pkmn } from "./types/pkmn";

function App() {
  const [correctGuesses, setCorrectGuesses] = useState<pkmn[]>([]);
  const [error, setError] = useState<{ error: boolean; msg: string }>({
    error: false,
    msg: "",
  });

  return (
    <div className="page-wrapper">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={<Home error={error} setError={setError} />}
          />
          <Route
            path="/game/:gen/:clueType/:alternativeType"
            element={
              <Game
                setCorrectGuesses={setCorrectGuesses}
                correctGuesses={correctGuesses}
                error={error}
                setError={setError}
              />
            }
          />
          <Route
            path="/correct-guesses"
            element={
              <PkmnList
                correctGuesses={correctGuesses}
                setCorrectGuesses={setCorrectGuesses}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
