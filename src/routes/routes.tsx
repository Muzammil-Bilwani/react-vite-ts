import { Navigate } from "react-router-dom";
import Login from "../screens/Login/Login";
import LayoutScreen from "../screens/Dashboard/Layout";
import Home from "../screens/Dashboard/Home/Home";

export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <LayoutScreen />,
    children: [
      {
        path: "/dashboard/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
];
