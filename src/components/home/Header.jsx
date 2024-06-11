import React from "react";

import { Icon } from "@iconify/react";
// import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { settingsApp } from "../../zustand/app/settings";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useAlerts } from "../../hooks/alerts/useAlerts";

const Header = () => {
  const { signOut } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { appSettings, hasAppSettings, setAppSettings } = settingsApp();

  // const menuItems = [
  //   "Profile",
  //   "Dashboard",
  //   "Activity",
  //   "Analytics",
  //   "System",
  //   "Deployments",
  //   "My Settings",
  //   "Team Settings",
  //   "Help & Feedback",
  //   "Log Out",
  // ];
  const menuItems = [
    {
      text: "Home",
      path: "/",
    },
    {
      text: "Clientes",
      path: "/customers",
    },
    {
      text: "Nuevo cliente",
      path: "/new-user",
    },
  ];

  const { questionAlert } = useAlerts();

  const cerrarSesion = async () => {
    const want = await questionAlert("Cerrar sesion", "Estas seguro de que quieres cerrar sesion.", "Cerrar sesion");
    if (!want) return;
    signOut();
  };

  return (
    <>
      {/* <Navbar>
      <NavbarBrand>
        <Icon icon="ic:sharp-sports-gymnastics" />
        <p className="font-bold text-inherit">China Gym</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 text-black" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/home">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/clientes" aria-current="page">
            Clientes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/new-user">
            Nuevo cliente
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Registrarse
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar> */}
      <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Icon icon="ic:sharp-sports-gymnastics" />
            <p className="font-bold text-inherit">{appSettings.nameApp}</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <Icon icon="ic:sharp-sports-gymnastics" />
            <p className="font-bold text-inherit">{appSettings.nameApp}</p>
          </NavbarBrand>
          <NavbarItem>
            <Link />
            <Link color="foreground" to="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link to="/customers" aria-current="page">
              Clientes
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" to="/new-user">
              Nuevo cliente
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          {/* <NavbarItem className="hidden lg:flex"> */}
          {/* <Link href="#">Login</Link> */}
          {/* </NavbarItem> */}
          <NavbarItem>
            <Button as={Link} color="warning" href="#" variant="flat" onClick={cerrarSesion}>
              Cerrar sesion
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.text}-${index}`}>
              <Link className="w-full" color={index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"} to={item.path} size="lg">
                {item.text}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default Header;
