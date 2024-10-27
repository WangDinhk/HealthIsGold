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

const CardComponent = () => {
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
        <span>-5%</span>
      </WrapperDiscountText>

      <StyleNameProduct>Viên uống Rocket 1h</StyleNameProduct>
      <WrapperReportText>
        <span>Đã bán 20</span>
      </WrapperReportText>
      <WrapperPriceText>
        <span>500.000đ</span>
        <span style={{ fontWeight: "350" }}>/Hộp</span>
      </WrapperPriceText>
      <WrapperOldPrice>7000.000đ</WrapperOldPrice>
      <WrapperQuantity>Hộp 5 viên</WrapperQuantity>
      <WrapperBuyButton type="primary">Chọn mua</WrapperBuyButton>
    </WrapperCardStyle>
  );
};

export default CardComponent;
