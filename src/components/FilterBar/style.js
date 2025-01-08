import styled from 'styled-components';
import { Radio, Checkbox, Button } from 'antd';

export const WrapperNavBar = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
`;

export const WrapperHead = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(to right, #fafafa, #ffffff);
  
  span {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
    letter-spacing: 0.3px;
  }

  svg {
    color: #1890ff;
  }
`;

export const WrapperBody = styled.div`
  .ant-collapse {
    border: none;
    background: transparent;
    
    .ant-collapse-item {
      border-bottom: 1px solid #f0f0f0;
      
      &:last-child {
        border-bottom: none;
      }

      .ant-collapse-header {
        padding: 16px 20px;
        font-weight: 500;
        color: #2c3e50;
        transition: all 0.3s ease;
        
        &:hover {
          color: #1890ff;
          background: rgba(24, 144, 255, 0.02);
        }

        .ant-collapse-expand-icon {
          color: #8c8c8c;
        }
      }
      
      .ant-collapse-content {
        border-top: none;
        
        .ant-collapse-content-box {
          padding: 4px 20px 16px;
        }
      }
    }
  }

  .ant-radio-wrapper {
    margin-bottom: 8px;
    color: #595959;
    transition: all 0.3s ease;

    &:hover {
      color: #1890ff;
    }

    .ant-radio-checked .ant-radio-inner {
      border-color: #1890ff;
    }
  }
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

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FilterItem = styled.div`
  .ant-checkbox-wrapper {
    color: #595959;
    font-size: 14px;
    transition: all 0.2s ease;
    width: 100%;
    padding: 6px 8px;
    border-radius: 4px;
    
    &:hover {
      color: #1890ff;
      background-color: rgba(24, 144, 255, 0.04);
    }
    
    .ant-checkbox {
      top: 0;
      
      .ant-checkbox-inner {
        border-radius: 4px;
        transition: all 0.2s ease;
      }
    }
    
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #1890ff;
      border-color: #1890ff;
    }
  }
`;

export const PriceRangeInput = styled.div`
  padding: 12px 0;
  
  .ant-slider {
    margin: 8px 0 24px;
    
    .ant-slider-rail {
      background-color: #f0f0f0;
    }
    
    .ant-slider-track {
      background-color: #1890ff;
    }
    
    .ant-slider-handle {
      border-color: #1890ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      
      &:hover {
        border-color: #40a9ff;
      }
      
      &:focus {
        box-shadow: 0 0 0 4px rgba(24, 144, 255, 0.12);
      }
    }
  }
  
  .price-range-display {
    display: flex;
    justify-content: space-between;
    color: #595959;
    font-size: 14px;
    font-weight: 500;
    
    span {
      background: #f5f5f5;
      padding: 4px 8px;
      border-radius: 4px;
    }
  }
`;

export const ShowMoreButton = styled(Button)`
  width: 100%;
  text-align: left;
  padding: 8px;
  height: auto;
  font-size: 13px;
  color: #1890ff;
  background: rgba(24, 144, 255, 0.04);
  border: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #40a9ff;
    background: rgba(24, 144, 255, 0.08);
  }
  
  &:active {
    background: rgba(24, 144, 255, 0.12);
  }
  
  &::after {
    display: none;
  }
`;
