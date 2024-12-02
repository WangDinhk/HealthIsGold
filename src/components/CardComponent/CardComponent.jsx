import React from "react";

import { Card, Button } from "antd";
import {
  StyleNameProduct,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
  WrapperCardStyle,
  WrapperOldPrice,
  WrapperBuyButton,
  WrapperQuantity,
} from "./style";
const { Meta } = Card;

const CardComponent = (props) => {
  const {
    key,
    name,
    image,
    type,
    price,
    discount,
    countInStock,
    manufacturer,
    description,
    unit,
    country,
    target,
    quantity,
    ingredient,
  } = props;
  return (
    <WrapperCardStyle
      hoverable
      bordered={false} // Tắt border mặc định
      style={{ width: 200 }}
      styles={{
        head: {
          width: "200px",
          height: "200px",
        },

        body: {
          padding: "10px",
        },
      }}
      cover={
        <img
          alt="example"
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00006403_rocket_tang_cuong_sinh_ly_nam_gioi_2459_5f7d_large_9695ba7122.JPG"
          style={{ padding: "20px" }}
        />
      }
    >
      <WrapperDiscountText>
        <span>-{discount}%</span>
      </WrapperDiscountText>

      <StyleNameProduct>{name}</StyleNameProduct>
      
      <WrapperPriceText>
      <span>{(price - price * discount / 100).toFixed(2)} đ</span>
        <span style={{ fontWeight: "350" }}>/{unit}</span>
      </WrapperPriceText>
      <WrapperOldPrice>{price} đ</WrapperOldPrice>
      <WrapperQuantity>{quantity}</WrapperQuantity>
      <WrapperBuyButton type="primary">Chọn mua</WrapperBuyButton>
    </WrapperCardStyle>
  );
};

export default CardComponent;
