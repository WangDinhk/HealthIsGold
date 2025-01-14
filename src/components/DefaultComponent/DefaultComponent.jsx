import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import NavBarComponent from "../NavBarComponent/NavBarComponent";
import TypeProduct from "../TypeProduct/TypeProduct";
const DefaultComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <NavBarComponent />
      

      {children}
    </div>
  );
};

export default DefaultComponent;
