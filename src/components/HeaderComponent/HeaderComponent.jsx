import React, { useEffect, useState } from "react";
import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperHeaderText,
} from "./Style";
import { Button, Col, Badge, Popover } from "antd";
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
  const user = useSelector((state) => state.user)
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  useEffect(() => {
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
  }, [user?.name, user?.avatar])

  console.log('user', user);
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
            {userAvatar ? (
              <img src={userAvatar} alter="avatar" style={{
                height: '30px',
                width: '30px',
                borderRadius: '50%',
                objectFit: 'cover',
            }}/>
            ) : (
            <UserOutlined style={{ fontSize: "30px" }} />
            )}
            {user?.accessToken ? (
              <>
                <Popover>
                  <div style={{ cursor: "pointer" }}>{userName?.length ? userName : user?.email}</div>
                </Popover>
              </>
            ) : (
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
