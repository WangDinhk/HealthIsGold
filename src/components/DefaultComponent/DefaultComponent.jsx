import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import NavBarComponent from "../NavBarComponent/NavBarComponent";
import TypeProduct from "../TypeProduct/TypeProduct";
import FooterComponent from "../FooterComponent/FooterComponent";
const DefaultComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <NavBarComponent />

      {children}
      <FooterComponent/>

    </div>
  );
};

export default DefaultComponent;
