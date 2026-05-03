import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/Nav";
import { Game } from "./pages/Game";
import { PkmnList } from "./pages/PkmnList";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="page-wrapper">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/correct-guesses" element={<PkmnList />} />
        </Routes>
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
