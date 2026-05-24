"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

export default function NavigationBar({ currentPage, onNavigate }) {
  return (
    <Navbar color="dark" dark expand="lg" className="mb-4">
      <div className="container">
        <NavbarBrand href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); }}>
          CSC391 Project
        </NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink
              href="#"
              active={currentPage === "home"}
              onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
            >
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#"
              active={currentPage === "reservations"}
              onClick={(e) => { e.preventDefault(); onNavigate("reservations"); }}
            >
              Reservations
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  );
}
