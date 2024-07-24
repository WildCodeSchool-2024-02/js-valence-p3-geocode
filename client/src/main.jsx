import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

import App from "./App";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import Information from "./pages/Information";
import News from "./pages/News";
import DashboardAdmin from "./pages/DashboardAdmin";
import Users from "./pages/dashboardAdmin/Users";
import Stations from "./pages/dashboardAdmin/Stations";
import Cars from "./pages/dashboardAdmin/Cars";
import Statistics from "./pages/dashboardAdmin/Statistics";

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
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "information",
        element: <Information />,
      },
      {
        path: "news",
        element: <News />,
      },
    ],
  },
  {
    path: "dashboardAdmin",
    element: <DashboardAdmin />,
    children: [
      {
        path: "stats",
        element: <Statistics />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "cars",
        element: <Cars />,
      },
      {
        path: "stations",
        element: <Stations />,
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
