import React from "react";
import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperHeaderText,
} from "./Style";
import { Button, Col, Badge } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const HeaderComponent = () => {
  const navigate = useNavigate();
  const user  = useSelector((state) => state.user)
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  console.log('user',user);
  return (
    <div>
      <WrapperHeader gutter={16}>
        <Col span={5}>
          <WrapperHeaderText>HEALTH IS GOLD</WrapperHeaderText>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            size="large"
            textButton="Search"
            placeHolder="Input search text"
          />
        </Col>
        <Col span={7} style={{ display: "flex", gap: "20px" }}>
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: "30px" }} />
            {user?.name?(
              <div style={{ cursor: "pointer" }}>{user.name}</div>
            ):(
              <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
              <div>
                <span>Đăng nhập</span>
                <div>
                  <span>Tài khoản</span>
                  <CaretDownOutlined />
                </div>
              </div>
            </div>
            )}
            
          </WrapperHeaderAccount>
          <WrapperHeaderAccount>
            <Badge count={5} size="small">
              <ShoppingCartOutlined
                style={{ fontSize: "30px", color: "white" }}
              />
            </Badge>
            <span>Giỏ hàng</span>
          </WrapperHeaderAccount>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
