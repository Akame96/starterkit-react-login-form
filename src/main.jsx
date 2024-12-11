import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import Registrazione from "./components/Registrazione";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import Admin from "./components/Admin";
import User from "./components/User";

// Funzione per controllare se l'utente è loggato
// eslint-disable-next-line no-unused-vars
function checkIfUserLogged() {
  if (localStorage.getItem("loginData")) {
    return null;
  } else {
    return redirect("/login");
  }
}

// Funzione per controllare se l'utente non è loggato
function checkIfUserNotLogged() {
  if (!localStorage.getItem("loginData")) {
    return null;
  } else {
    return redirect("/dashboard");
  }
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: checkIfUserNotLogged,
  },
  {
    path: "/registrazione",
    element: <Registrazione />,
    loader: checkIfUserNotLogged,
  },
  {
    path: "/",
    element: <Homepage />,
    loader: checkIfUserNotLogged,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: checkIfUserNotLogged,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path:"/admin",
    element:<Admin />
  },
  {
    path:"/user",
    element:<User />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
    <RouterProvider router={router} />
  </React.StrictMode>
);
