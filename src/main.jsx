import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Link, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import RootLayout from "./layouts/root-layout.jsx";
import SignInPage from "./routes/Sign-in.jsx";
import SignUpPage from "./routes/Sign-up.jsx";
import Home from "./pages/Home.jsx";
import Customers from "./pages/Customers.jsx";
import NewUser from "./pages/NewUser.jsx";
import Settings from "./pages/Settings.jsx";
import UserSelected from "./pages/UserSelected.jsx";
import Header from "./components/home/Header.jsx";
import Statistics from "./pages/Statistics.jsx";
import EditUser from "./pages/EditUser.jsx";
import AdminOptions from "./pages/AdminOptions.jsx";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/customers", element: <Customers /> },
      { path: "/new-user", element: <NewUser /> },
      { path: "/user/:id", element: <UserSelected /> },
      { path: "/user/:id/edit", element: <EditUser /> },
      { path: "/admin-options", element: <AdminOptions /> },
      { path: "/settigns", element: <Settings /> },
      { path: "/statistics", element: <Statistics /> },

      { path: "/sign-up/*", element: <SignUpPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <NextUIProvider>
      {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY}> */}
      {/* <App /> */}
      {/* </ClerkProvider> */}
      <RouterProvider router={router} />
    </NextUIProvider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
