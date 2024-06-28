import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import DashboardUser from "./pages/DashboardUser";
import CarsUser from "./pages/CarsUser";
import BooksUser from "./pages/BooksUser";
import InformationsUser from "./pages/InformationsUser";

import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "DashboardUser",
    element: <DashboardUser />,
    children: [
      {
        path: "information",
        element: <InformationsUser />,
      },
      {
        path: "cars",
        element: <CarsUser />,
      },
      {
        path: "books",
        element: <BooksUser />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
