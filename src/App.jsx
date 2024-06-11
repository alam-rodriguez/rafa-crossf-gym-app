import "./App.css";

// Pages
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import NewUser from "./pages/NewUser";
import Settings from "./pages/Settings";
import UserSelected from "./pages/UserSelected";

// Components
import Header from "./components/home/Header";

// react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderSecondary from "./components/app/HeaderSecondary";
import { useEffect } from "react";
import { settingsApp } from "./zustand/app/settings";

import { RedirectToSignIn, RedirectToSignUp, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

// import SignInPage from "./routes/sign-in";
import SignInPage from "./routes/Sign-in";
import SignUpPage from "./routes/Sign-up";
// import SignUpPage from "./routes/sign-up";

function App() {
  const { appSettings } = settingsApp();

  // const location = useLocation();
  // useEffect(() => {
  //   // console.log(location.pathname)
  // }, [location]);

  useEffect(() => {
    console.log(appSettings);
  }, []);

  return (
    <header>
      <SignedOut>
        {/* <SignInButton /> */}

        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );

  // return (
  //   <main className="">
  //     {location.pathname == "/" || location.pathname == "/clientes" || location.pathname == "/new-user" ? <Header /> : <HeaderSecondary />}
  //     <div className="px-12">
  //       <Routes>
  //         <Route path="/" Component={Home} />
  //         <Route path="/sign-in" Component={SignInPage} />
  //         <Route path="/sign-up" Component={SignUpPage} />

  //         <Route path="/clientes" Component={Clientes} />
  //         <Route path="/new-user" Component={NewUser} />
  //         <Route path="/user/:id" Component={UserSelected} />
  //         <Route path="/settings" Component={Settings} />
  //       </Routes>
  //     </div>
  //   </main>
  // );
}

export default App;
