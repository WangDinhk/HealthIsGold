import React, { useEffect, useState, useMemo } from "react";
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperHeaderText,
} from "./Style";
import {  Col, Badge, Popover } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../service/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import * as CartService from "../../service/CartService";

const HeaderComponent = ({ isHiddenCart = false, isHiddenSearch = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  
  // Enhanced debugging logs
  useEffect(() => {
    console.log("Complete user object:", user);
    console.log("isAdmin value:", user?.isAdmin);
    console.log("isAdmin type:", typeof user?.isAdmin);
    console.log("isAdmin strict equality check:", user?.isAdmin === true);
  }, [user]);

  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleNavigateCart = () => {
    navigate('/order');
  };

  const { data: cartData } = useQuery({
    queryKey: ['cart', user?.id],
    queryFn: () => CartService.getUserCart(user?.id),
    enabled: !!user?.id && !isHiddenCart,
    staleTime: 2 * 60 * 1000, // Cache 2 phút
    cacheTime: 5 * 60 * 1000,
    retry: 1
  });
  
  const cartItemCount = useMemo(() => {
    return cartData?.data?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  }, [cartData?.data?.items]);

  const content = (
    <div>
      <WrapperContentPopup onClick={handleLogout}>
        Đăng xuất
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => navigate("/profile-user")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {(() => {
        const isAdminUser = Boolean(user?.isAdmin);
        console.log("Rendering admin menu check:", {
          rawIsAdmin: user?.isAdmin,
          convertedIsAdmin: isAdminUser,
          strictCheck: user?.isAdmin === true
        });
        
        return user?.isAdmin === true ? (
          <WrapperContentPopup onClick={() => navigate("/system/admin")}>
            Quản lí hệ thống
          </WrapperContentPopup>
        ) : null;
      })()}
    </div>
  );
  useEffect(() => {
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
  }, [user?.name, user?.avatar]);

  
  return (
    <div>
      <WrapperHeader gutter={16} style={{ justifyContent: "space-between" }}>
        <Col span={5}>
          <WrapperHeaderText 
            onClick={handleNavigateHome}
            style={{ cursor: 'pointer' }}
          >
            HEALTH IS GOLD
          </WrapperHeaderText>
        </Col>

        {!isHiddenSearch && (
          <Col span={12}>
            <ButtonInputSearch
              size="large"
              textButton="Search"
              placeHolder="Input search text"
            />
          </Col>
        )}

        <Col span={7} style={{ display: "flex", gap: "20px" }}>
          <Loading isLoading={loading}>
            <WrapperHeaderAccount>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alter="avatar"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}
              {user?.accessToken ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ cursor: "pointer" }}>
                      {userName?.length ? userName : user?.email}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
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
          </Loading>

          {!isHiddenCart && (
            <WrapperHeaderAccount onClick={handleNavigateCart} style={{ cursor: 'pointer' }}>
              <Badge count={cartItemCount} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "white" }}
                />
              </Badge>
              <span>Giỏ hàng</span>
            </WrapperHeaderAccount>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
