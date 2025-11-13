import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import HomePage from "../Pages/HomePage/HomePage";
import BuyerCart from "../Pages/BuyerCart/BuyerCart";
import BuyerProfile from "../Pages/BuyerProfile/BuyerPorfile";
import AuthLayouts from "../Layouts/AuthLayouts";
import RegisterPage from "../Pages/Authentications/RegisterPage";
import LoginPage from "../Pages/Authentications/LoginPage";
import SellerDashboard from "../Pages/SellerDashboard/SellerDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: async () => {
          // Categories fetch
          const catRes = await fetch("/categoriesData.json");
          const categories = await catRes.json();

        //   Products fetch
          const prodRes = await fetch("/productData.json");
          const products = await prodRes.json();

        //   return categories;
          return { categories, products };
        },
      },
      {
        path: "/cart",
        element : <BuyerCart/>
      },
      {
        path: "/profile",
        element : <BuyerProfile/>
      },
      {
        path : '/seller-dashboard',
        element : <SellerDashboard/>
      }
    ],
  },
  {
    path : "/",
    element : <AuthLayouts/>,
    children : [
      {
        path : "/login",
        element : < LoginPage/>
      },
      {
        path : "/register",
        element : <RegisterPage/>
      }
    ]
  }
]);

