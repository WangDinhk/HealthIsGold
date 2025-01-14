import styled from "styled-components";
import { Card, Button } from "antd";

export const StyleNameProduct = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
  color: rgb(39, 39, 42);
  font-family: 'Arial', sans-serif;
  margin: 10px 0;
  height: 42px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
    width: 100%;
    transition: transform 0.3s ease;
  }
  &:hover img {
    transform: scale(1.1);
  }
     &:hover {
    border: 1px solid blue; /* Thêm border màu xanh khi hover */
  }
  position: relative;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const WrapperImageContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }
`;

export const WrapperImageStyle = styled.img`
  top: -1px;
  left: -1px;
  height: 200px;
  width: 200px;
  position: absolute;
  object-fit: contain;
`;

export const WrapperBuyButton = styled(Button)`
  width: 100%;
  height: 40px;
  border-radius: 30px;
  margin: 20px 0 2px;

  border: none;
  background: ${props => props.disabled ? '#ccc' : '#3A65D9'};
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  &:hover {
    opacity: 0.8;
    background: ${props => props.disabled ? '#ccc' : '#3A65D9'} !important;
    color: #fff !important;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;


export const WrapperQuantity = styled.div`
  width: 150px;
  height: 26px;
  background: #eef0f3;
  text-align: center;
  border-radius: 8px;
  font-weight: 500;
  color: #4b4f61;
`;