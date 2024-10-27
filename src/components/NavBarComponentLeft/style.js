import styled from "styled-components";
import { Radio, Checkbox } from "antd"; // Thêm dòng này

export const WrapperNavBar = styled.div`
  width: 290px;
  max-height: 830px;
  background-color: #faf3ea;
  border-radius: 20px;
`;

export const WrapperHead = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 12px;
  font-size: 16px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  font-weight: 600;
  border-bottom: 1px solid #e5e8ec;
  border-top: 1px solid #dadfe4; //KHUNG BAO QUANH MENU CHỌN
  border-left: 1px solid #dadfe4; //KHUNG BAO QUANH MENU CHỌN
  border-right: 1px solid #dadfe4; //KHUNG BAO QUANH MENU CHỌN
`;
export const WrapperBody = styled.div`
  width: 100%;
  border: 1px solid #dadfe4; //KHUNG BAO QUANH MENU CHỌN
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  border-top: 0;
`;

//RADIOBUTTON
export const RadioButton = styled(Radio.Button)`
  width: 100%;
  margin: 5px 0;
  border-radius: 7px;
  content: none;
  text-align: center;
  border: 1px solid #d9d9d9;
  //SỬA MẶC ĐỊNH BUTTON TRONG ANTD
  &.ant-radio-button-wrapper:not(:first-child)::before {
    display: none;
  }

  //SỬA MẶC ĐỊNH BUTTON TRONG ANTD

  &:hover {
    background-color: #ffff;
    border-color: #264fd4;
    color: #264fd4;
  }

  &.ant-radio-button-wrapper-checked {
    background-color: #ffff;
    border-color: #264fd4;
    color: #264fd4;
  }
`;
//check box
export const CheckboxGroup = styled(Checkbox.Group)`
  width: 100%;
  display: flex;
  border: none;
  flex-direction: column;
`;

export const CheckboxItems = styled(Checkbox)`
  margin: 8px 0;
  font-size: 16px;
  color: #333; /* Màu chữ */
  //HOVER

  &.ant-checkbox-wrapper {
    display: flex;
    align-items: center;
  }
  //KHI CLICK
  &.ant-checkbox-checked {
    color: #264fd4;
  }
`;
//label
export const LabelStyled = styled.span`
  font-size: 16px;
  font-weight: 500;
`;
