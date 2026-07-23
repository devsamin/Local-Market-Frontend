import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../components/ErrorPage";
import { GuestRoute, ProtectedRoute } from "../components/RouteGuard";
import AuthLayouts from "../Layouts/AuthLayouts";
import RootLayout from "../Layouts/RootLayout";


const HomePage = lazy(() => import("../Pages/HomePage/HomePage"));
const BuyerCart = lazy(() => import("../Pages/BuyerCart/BuyerCart"));
const RegisterPage = lazy(() => import("../Pages/Authentications/RegisterPage"));
const LoginPage = lazy(() => import("../Pages/Authentications/LoginPage"));
const SellerDashboard = lazy(() => import("../Pages/SellerDashboard/SellerDashboard"));
const UserProfile = lazy(() => import("../Pages/Profile/UserProfile"));
const PaymentSuccess = lazy(() => import("../Pages/BuyerCart/PaymentSuccess/PaymentSuccess"));
const PaymentFailed = lazy(() => import("../Pages/BuyerCart/PaymentFailed/PaymentFailed"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cart", element: <ProtectedRoute role="buyer"><BuyerCart /></ProtectedRoute> },
      { path: "profile", element: <ProtectedRoute><UserProfile /></ProtectedRoute> },
      { path: "seller-dashboard", element: <ProtectedRoute role="seller"><SellerDashboard /></ProtectedRoute> },
      { path: "payment-success", element: <ProtectedRoute role="buyer"><PaymentSuccess /></ProtectedRoute> },
      { path: "payment-failed", element: <ProtectedRoute role="buyer"><PaymentFailed /></ProtectedRoute> },
    ],
  },
  {
    path: "/",
    element: <AuthLayouts />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <GuestRoute><LoginPage /></GuestRoute> },
      { path: "register", element: <GuestRoute><RegisterPage /></GuestRoute> },
    ],
  },
]);
