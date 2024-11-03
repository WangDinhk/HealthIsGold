import { Col } from "antd";
import styled from "styled-components";

export const WrapperImg = styled(Col)`
padding:20px;
position: relative;
`;

// description
export const WrapperDescription = styled(Col)`
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 17px;
`;

export const WrapperNameProduct = styled.h1``;
export const WrapperBrandProduct = styled.div`
  display: flex;
  font-weight: 500;
`;
export const WrapperNameBrandProd = styled.span`
  margin-left: 5px;
  color: #264fd4;
`;
export const WrapperRate_ID = styled.div`
  display: flex;
  align-items: center;
`;
export const WrapperRate = styled.span`
  color: #4b4f61;
`;
export const WrapperID = styled.span`
  color: #4b4f61;
`;

export const WrapperPriceText = styled.div`
  font-size: 30px;
  color: #264fd4;
  font-weight: 600;
  display: flex;
  align-items: baseline;
`;
export const WrapperOldPrice = styled.div`
  color: #4b4f61;
  font-weight: 350;
  text-decoration-line: line-through;
`;
export const WrapperQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
//end description
