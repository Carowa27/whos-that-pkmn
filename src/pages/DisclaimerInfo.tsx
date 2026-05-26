import { Link } from "react-router-dom";

export const DisclaimerInfo = () => {
  return (
    <section className="project-disclaimer">
      <p>
        This project is a non-commercial hobby project created for educational
        and entertainment purposes.
      </p>

      <p>
        I do not own any Pokémon-related names, images, data, trademarks, or
        other intellectual property. Pokémon and all related properties are
        owned by Nintendo, Game Freak, and The Pokémon Company.
      </p>

      <p>
        This project is not affiliated with, endorsed by, or connected to
        Nintendo, Game Freak, The Pokémon Company, or any of their subsidiaries.
      </p>

      <p>
        Pokémon data used in this application is provided by{" "}
        <Link
          to={"https://pokeapi.co"}
          target="_blank"
          rel="noopener noreferrer"
        >
          PokéAPI
        </Link>
        .
      </p>
    </section>
  );
};
