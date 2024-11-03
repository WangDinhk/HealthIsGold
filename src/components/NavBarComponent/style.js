import styled from "styled-components";
import { Link } from "react-router-dom";

import { DownOutlined } from "@ant-design/icons";

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
