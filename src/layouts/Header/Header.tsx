import React from "react";
import HeaderNavigation from "./components/HeaderNavigation/HeaderNavigation";
import HeaderSearchForm from "./components/HeaderSearchForm/HeaderSearchForm";

function Header() {
  return (
    <header className="header">
      <HeaderSearchForm />
      <HeaderNavigation />
    </header>
  );
}

export default Header;
