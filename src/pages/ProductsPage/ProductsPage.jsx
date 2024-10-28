import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import {
  WrapperBody,
  WrapperLinks,
  WrapperLink,
  WrapperLinkItem,
} from "./style";
const ProductsPage = () => {
  return (
    <div style={{    background: "#EEF0F3"
    }}>
    <WrapperBody>
      <WrapperLinks>
        <WrapperLinkItem>
          <WrapperLink href="">Đường dẫn1</WrapperLink>
          <span>/</span>
        </WrapperLinkItem>
        <WrapperLinkItem>
          <WrapperLink href="">Đường dẫn2</WrapperLink>
          <span>/</span>

        </WrapperLinkItem>
        <WrapperLinkItem>
        <WrapperLink href="">Đường dẫn3</WrapperLink>
        <span>/</span>
        </WrapperLinkItem>
        <WrapperLinkItem>
            <span style={{color:"#000"}}>tên sp</span>
        </WrapperLinkItem>
      </WrapperLinks>
      <ProductDetailsComponent />
    </WrapperBody>
    </div>
  );
};

export default ProductsPage;
