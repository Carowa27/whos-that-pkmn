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

  return (
    <div className="page-wrapper">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/game/:gen/:clueType/:alternativeType"
            element={
              <Game
                setCorrectGuesses={setCorrectGuesses}
                correctGuesses={correctGuesses}
              />
            }
          />
          <Route
            path="/correct-guesses"
            element={<PkmnList correctGuesses={correctGuesses} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
