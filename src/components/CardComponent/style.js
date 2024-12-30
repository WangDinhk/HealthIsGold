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
  font-weight: 500;
  color: rgb(255, 66, 78);
  font-size: 16px;
  margin: 8px 0;
`;

export const WrapperOldPrice = styled.div`
  color: rgb(128, 128, 137);
  text-decoration: line-through;
  font-size: 12px;
  margin-bottom: 8px;
`;

export const WrapperDiscountText = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #ff0000;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 12px;
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
  height: 34px;
  border-radius: 4px;
  border: none;
  background: ${props => props.disabled ? '#ccc' : '#1a94ff'};
  color: #fff;
  font-weight: 500;
  font-size: 13px;
  &:hover {
    opacity: 0.8;
    background: ${props => props.disabled ? '#ccc' : '#1a94ff'} !important;
    color: #fff !important;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

export const WrapperQuantity = styled.div`
  font-size: 12px;
  color: rgb(128, 128, 137);
  margin-bottom: 8px;
`;
