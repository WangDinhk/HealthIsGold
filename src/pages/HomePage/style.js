import styled from "styled-components";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  height: 44px;
`;

export const SlideImageContainer = styled.div`
  align-items: center;
  width: 100%;
  background-color: #efefef;
  padding: 24px 120px;
  margin-bottom: 25px;
`;

export const WrapperPanner = styled.img`
  position: absolute;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  top: -11px;
  display: flex;
  align-items: center;
`;
export const WrapperPannerContent = styled.h2`
  position: absolute;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  font-size: 19px;
  top: -1px;
  font-weight: 600;
  color: #fff;
`;
export const WrapperBody = styled.div`
  display: flex;
  gap: 20px;
  height: 4000px;
  margin: 0px 120px;
  padding-top: 20px;
`;
