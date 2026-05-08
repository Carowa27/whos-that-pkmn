# whos that pkmn

## Author and developer

- [Carolina](https://github.com/Carowa27)

## Assignment: React application with API and Routing

This project is a React application that uses a public API to manage and display data with local state handling. Axios is used for all API requests, with a separate src/api/ structure containing a configured Axios instance and dedicated functions for data operations.

The application uses React Router DOM with multiple pages and dynamic routing via useParams. State is managed locally using useState, and useEffect is used for API calls and side effects. Changes such as creating, updating, or removing data are reflected in the local state.

The project is built with reusable components and controlled forms with basic validation.

### Purpose

For this assignment, I wanted to build something fun that I could continue developing and using beyond just the coursework. I decided to recreate a version of “Who’s That Pokémon?”, inspired by a game I enjoyed as a child.

This is a hobby/educational project with no affiliation to Pokémon or its creators.

### Features

The current game allows users to guess Pokémon based on either an image or Pokédex entry. Users can also filter by generation or choose the full national Pokédex.

Planned features include text-based guessing, time attack mode, local high scores, and tracking correct guesses per generation.

### API

This project uses the [pokeAPI](https://pokeapi.co/) as its data source.
All data is fetched directly from the API and is not owned or created by me.

## Commit message convention

type message

_examples_

docs add readme
ref update all js to ts

### Types

| Type          | Short  | Description                                              |
| ------------- | ------ | -------------------------------------------------------- |
| feature       | feat   | new feature                                              |
| bug fix       | bug    | bug fix                                                  |
| documentation | docs   | changes or adds to documentation                         |
| refactor      | ref    | code changes that neither fix a bug nor adds a feature   |
| build         | build  | changes that affect the build or dependencies            |
| reverts       | revert | revert to previos commit                                 |
| clean         | clean  | clean code of, for example, comments or unnecessary code |

### Badges

![Lang TS](https://img.shields.io/badge/lang-TS-007acc) ![Lib React](https://img.shields.io/badge/lib-React-61DBFB)

![npm axios](https://img.shields.io/badge/npm-axios-9846A9)

### Demo

To get it up and running follow these steps:

1. install all dependencies by writing "npm i" in the terminal
2. to compile ts to js write "npm run build" and get a dist file
3. to get the site up at localhost to see it write "npm run dev".

### Screenshots

#### Home page

_coming soon_

#### Game page

_coming soon_

#### Correct guesses page

_coming soon_

### Accessibility screenshots

#### Lighthouse

_coming soon_
