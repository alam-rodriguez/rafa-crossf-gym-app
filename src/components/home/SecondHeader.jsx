import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { AcmeLogo } from "./AcmeLogo.jsx";

export default function SecondHeader() {
  const { id } = useParams();
  const { key, pathname } = useLocation();

  // useEffect(() => {
  //   console.log(location);
  // }, [location]);

  const navigate = useNavigate();

  const back = () => {
    if (pathname == "/admin-options") {
      navigate("/");
      return;
    }
    if (key == "default" || key == "") {
      navigate("/");
      return;
    }
    console.log(location);
    // return;
    const path = `/user/${id}`;
    console.log(path);
    console.log(-1);
    navigate(-1);
    // console.log(location);
  };

  const [title, setTitle] = useState("User information");

  useEffect(() => {
    if (pathname == "/admin-options") setTitle("Opciones de administrador");
    if (pathname == "/settigns") setTitle("Ajustes de app");
    if (pathname == "/statistics") setTitle("Estadisticas");
  }, [pathname]);

  return (
    <nav className="sticky top-0 border-b flex w-full items-center gap-3 p-5 bg-white">
      <Icon icon="material-symbols-light:close" className="text-2xl" onClick={back} />
      <p className="font-bold">{title}</p>
    </nav>
  );
}
