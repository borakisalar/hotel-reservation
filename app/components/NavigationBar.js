"use client";

import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { usePathname } from "next/navigation";

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <Navbar color="dark" dark expand="lg" className="mb-4">
      <div className="container">
        <Link href="/" passHref legacyBehavior>
          <NavbarBrand>CSC391 Project</NavbarBrand>
        </Link>
        <Nav navbar>
          <NavItem>
            <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
              Home
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/reservations" className={`nav-link ${pathname === "/reservations" ? "active" : ""}`}>
              Reservations
            </Link>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  );
}
