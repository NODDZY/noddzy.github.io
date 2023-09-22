import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/main.css";

import MainPage from "./pages/MainPage";
import ErrorPage from "./pages/ErrorPage";

import Index from "./routes/Index";
import Hiscores from "./routes/HiScores";
import Yr from "./routes/Yr";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "hiscores", element: <Hiscores /> },
      { path: "yr", element: <Yr /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
