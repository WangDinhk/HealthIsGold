import styled from "styled-components";
import { Card, Button } from "antd";
export const StyleNameProduct = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 16px;
  color: rgb(56; 56; 61);
`;

export const WrapperReportText = styled.div`
  font-size: 16px;
  color: rgb(128; 128; 137);
  display: flex;
  align-items: center;
  margin: 6px 0 4px;
`;

export const WrapperPriceText = styled.div`
  font-size: 16px;
  color: #264fd4;
  font-weight: 500;
  display: flex;
  align-items: baseline;
`;
export const WrapperOldPrice = styled.div`
  font-size: 14px;
  color: rgb(128; 128; 137);
  font-weight: 350;
  text-decoration-line: line-through;
`;
export const WrapperDiscountText = styled.div`
  background: linear-gradient(295deg, #cd1a0c 0%, #ff5246 98.45%);
  width: 50px;
  height: 23px;
  top: -1px;
  left: -1px;
  border-top-left-radius: 1.1rem;
  border-bottom-right-radius: 1.1rem;
  position: absolute;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;
export const WrapperCardStyle = styled(Card)`
  width: 200px;
  & img {
    height: 200px;
    width: 200px;
  }
  height: 408px;

  position: relative;
  &:hover {
    border: 1px solid blue; /* Thêm border màu xanh khi hover */
  }
  border-radius:1.3rem;
`;
export const WrapperBuyButton = styled(Button)`
  margin: 20px 0 2px;
  width: 100%;
  height: 40px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500; /* Lưu ý: font-weight không có đơn vị px */
`;
export const WrapperQuantity = styled.div`
  width: 96px;
  height: 26px;
  background: #eef0f3;
  text-align: center;
  border-radius: 8px;
  font-weight: 500;
  color: #4b4f61;
`;
