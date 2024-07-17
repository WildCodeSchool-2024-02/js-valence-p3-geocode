import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import LogIn from "./components/LogIn";



import App from "./App";
import Register from "./components/Register";
import Sign from "./pages/Sign";
import RecoveryPassword from "./components/RecoveryPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "sign",
        element: <Sign />
      },
      {
        path: "recov",
        element: <RecoveryPassword />
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
