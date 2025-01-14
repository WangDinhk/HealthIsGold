import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
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
  height: auto;
  margin: 20px 160px;
  padding-top: 40px;
  // Nếu để navbarleft sang page khác chứ không phải cố định homepage 
  // thì để lại padding là 20px cho body không đụng panner
`;

export const WrapperCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;
export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover{
    background-color: rgb(13,92,182);
    color: #fff;
    span {
      color: #fff;
    }
  }
  width: 100%;
  text-align: center;
`