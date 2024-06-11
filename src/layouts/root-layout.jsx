import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Header from "../components/home/Header";
import { useEffect } from "react";
import { useGetSettings } from "../requests/settigns/useSettings";

// Zustand
import { settingsApp } from "../zustand/app/settings";
import { getPayments } from "../requests/payments/usePayments";
import { zusPayments } from "../zustand/payments/payments";
import { useSettings } from "../hooks/settings/useSettings";
import { usePayments } from "../hooks/payments/usePayments";
import SecondHeader from "../components/home/SecondHeader";
// import { useGetSettings } from "../hooks/settigns/useSettings";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  useSettings();
  usePayments();

  let { pathname } = useLocation();

  // const { appSettings, hasAppSettings, setAppSettings } = settingsApp();
  // const { hasPayments, payments, setPayments } = zusPayments();
  // useEffect(() => {
  //   if (hasAppSettings) return;
  //   const f = async () => {
  //     const res = await useGetSettings();
  //     setAppSettings(res);
  //   };
  //   f();
  // }, []);
  // useEffect(() => {
  //   if (hasPayments) return;
  //   const f = async () => {
  //     const res = await getPayments();
  //     if (res) setPayments(res);
  //   };
  //   f();
  // }, []);

  const navigate = useNavigate();

  return (
    <ClerkProvider navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
      {/* {location.pathname == "/" || location.pathname == "/clientes" || location.pathname == "/new-user" ? <Header /> : <HeaderSecondary />} */}
      {/* <Header /> */}
      {/* <SecondHeader /> */}

      {pathname.startsWith("/user") || pathname == "/admin-options" || pathname == "/settigns" || pathname == "/statistics" ? <SecondHeader /> : <Header />}

      <header className="header">
        <div>
          {/* <div>
            <p>Bienvenido a china gym app</p>
          </div> */}
          <SignedIn>
            {/* <p>hola</p> */}
            {/* <UserButton afterSignOutUrl="/sign-in" /> */}
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">Sign In</Link>
            <RedirectToSignIn />
          </SignedOut>
        </div>
      </header>
      <main className="mt-10 mx-3 sm:mx-12 md:mx-24 lg:mx-36 xl:mx-40">
        <Outlet />
      </main>
    </ClerkProvider>
  );
}
