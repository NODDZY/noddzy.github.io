import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./styles/main.css";

import MainPage from "./pages/MainPage";
import ErrorPage from "./pages/ErrorPage";

import Index from "./routes/Index";
import Hiscores from "./routes/HiScores";
import Yr from "./routes/Yr";
import ChampionBrowser from "./routes/ChampionBrowser"

const router = createHashRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "hiscores", element: <Hiscores /> },
      { path: "yr", element: <Yr /> },
      { path: "lol-champions", element: <ChampionBrowser /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
