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
import DashboardUser from "./pages/DashboardUser";
import CarsUser from "./pages/dashboardUser/CarsUser";
import BooksUser from "./pages/dashboardUser/BooksUser";
import InformationsUser from "./pages/dashboardUser/InformationsUser";
import Map from "./pages/Map";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/privateRoute";

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
      {
        path: "map",
        element: (
          <PrivateRoute>
            <Map />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboardAdmin",
    element: (
      <PrivateRoute>
        <DashboardAdmin />
      </PrivateRoute>
    ),
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
  {
    path: "dashboardUser",
    element: (
      <PrivateRoute>
        <DashboardUser />
      </PrivateRoute>
    ),
    children: [
      {
        path: "books",
        element: <BooksUser />,
      },
      {
        path: "cars",
        element: <CarsUser />,
      },
      {
        path: "information",
        element: <InformationsUser />
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
