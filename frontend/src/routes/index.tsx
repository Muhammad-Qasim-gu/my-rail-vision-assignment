import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  SignUp,
  Login,
  HomePage,
  TrainDetails,
  PurchaseTicket,
  AboutUs,
  TicketList,
} from "@/pages";

import { PrivateRoute, PublicRoute } from "@/components/index";

// import { CartProvider } from "@/context/index";

export const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/aboutUs", element: <AboutUs /> },
      {
        path: "/purchaseTicket/:trainNumber",
        element: (
            <PurchaseTicket/>
        ),
      },
      { path: "/TicketList", element: <TicketList /> },

      {
        path: "/train/:trainNumber",
        element: <TrainDetails />,
      },
      { path: "*", element: <Navigate to="/home" replace /> },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },

      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  },
]);
