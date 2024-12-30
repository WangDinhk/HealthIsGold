import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import {
  StyleNameProduct,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperCardStyle,
  WrapperOldPrice,
  WrapperBuyButton,
  WrapperQuantity,
  WrapperImageContainer,
} from "./style";

const CardComponent = (props) => {
  const navigate = useNavigate();
  const {
    _id,
    name,
    image,
    type,
    price,
    discount,
    countInStock,
    unit,
    quantity,
  } = props;

  const handleCardClick = () => {
    navigate(`/product/${_id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price);
  };

  const discountedPrice = price - (price * discount / 100);

  return (
    <WrapperCardStyle
      hoverable
      bordered={false}
      style={{ width: 200, cursor: 'pointer', position: 'relative' }}
      cover={
        <WrapperImageContainer>
          <img
            alt={name}
            src={image || "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00033041_vien_uong_bo_sung_vitamin_d3_k2_mk7_pharmekal_d3k2_60v_7485_63b7_large_ee46593def.jpg"}
            style={{ padding: "10px", height: "200px", objectFit: "contain" }}
          />
        </WrapperImageContainer>
      }
      onClick={handleCardClick}
    >
      {discount > 0 && (
        <WrapperDiscountText>
          <span>-{discount}%</span>
        </WrapperDiscountText>
      )}

      <StyleNameProduct title={name}>{name}</StyleNameProduct>
      
      <WrapperPriceText>
        <span>{formatPrice(discountedPrice)}</span>
        {unit && <span style={{ fontWeight: "350" }}>/{unit}</span>}
      </WrapperPriceText>

      {discount > 0 && (
        <WrapperOldPrice>{formatPrice(price)}</WrapperOldPrice>
      )}

      {quantity && (
        <WrapperQuantity>Số lượng: {quantity}</WrapperQuantity>
      )}

      {countInStock === 0 ? (
        <WrapperBuyButton type="primary" disabled>
          Hết hàng
        </WrapperBuyButton>
      ) : (
        <WrapperBuyButton type="primary">
          Thêm vào giỏ
        </WrapperBuyButton>
      )}
    </WrapperCardStyle>
  );
};

export default CardComponent;
