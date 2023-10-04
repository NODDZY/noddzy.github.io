import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./styles/main.css";

import MainPage from "./pages/MainPage";
import ErrorPage from "./pages/ErrorPage";

import Index from "./routes/Index";
import Hiscores from "./routes/HiScores";
import Weather from "./routes/Weather";
import ChampionBrowser from "./routes/ChampionBrowser";
import RedditScroller from "./routes/RedditScroller";
import PokeAPI from "./routes/PokeAPI";

const router = createHashRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "hiscores", element: <Hiscores /> },
      { path: "forecast", element: <Weather /> },
      { path: "lol-champions", element: <ChampionBrowser /> },
      { path: "reddit-scroller", element: <RedditScroller /> },
      { path: "pokeapi", element: <PokeAPI /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
