import styled from "styled-components";
import { Link } from "react-router-dom";

import { DownOutlined } from "@ant-design/icons";
import { Menu as AntMenu } from "antd"; // Add this import

export const WrapperListDropdown = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  padding: 0 120px;
  padding-top: 5px;
  justify-content: space-between;
  align-items: center;
`;

export const WrapperDropdown = styled.li`
  display: inline-block;
  list-style-type: none;
  cursor: pointer;
`;
export const StyledDownOutlined = styled(DownOutlined)`
  margin-left: 4px;
  transition: transform 0.3s ease;
  color: #476d90;
`;

export const WrapperButton = styled(Link)`
  text-decoration: none; /* Bỏ gạch chân */
  color: inherit; /* Giữ nguyên màu văn bản */

  border: none;
  font-weight: 500;
  font-size: 15px;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 7px;
  height: 44px;
  display: flex;
  align-items: center;
  transition: box-shadow 0.3s ease, color 0.3s ease;
  padding: 0 15px;

  &:hover {
    color: #265ade;
    box-shadow: 0px 4px 8px #265ade;

    .anticon-down {
      transform: rotate(-180deg);
    }
  }
`;
export const ItemImg = styled.img`
  width: 20px;
  margin-right: 5px;
  height: auto;
  padding-bottom: 10px;
  padding-top: 10px;
`;

export const WrapperMenu = styled(AntMenu)`
  background: white;
  border-radius: 4px;
  min-width: 280px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  .ant-menu-item {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
      background-color: #f6f9fc;
      color: #2167DD;
    }

    &::after {
      content: '';
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      border-top: 2px solid #999;
      border-right: 2px solid #999;
      transform: translateY(-50%) rotate(45deg);
      opacity: 0;
      transition: all 0.3s ease;
    }

    &:hover::after {
      opacity: 1;
      right: 12px;
    }
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  position: relative;
`;

export const WrapperProductList = styled.div`
  position: absolute;
  left: 100%;
  top: 0;
  background: white;
  width: 600px;
  min-height: 400px;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  opacity: 0;
  visibility: hidden;
  transform: translateX(10px);
  transition: all 0.3s ease;

  ${({ isVisible }) => isVisible && `
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  `}

  .product-card {
    background: #f8fafc;
    border-radius: 8px;
    padding: 12px;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
  }
`;

export const ProductOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  pointer-events: none;
`;

export const WrapperMenuItems = styled.div`
  min-width: 200px;
`;
