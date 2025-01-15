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
  LogoutOutlined,
  ShopOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../service/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import * as CartService from "../../service/CartService";
import logo from '../../assets/images/HEALTH1.png';

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
      <LogoutOutlined />
        Đăng xuất
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => navigate("/profile-user")}>
      <UserOutlined />
        Thông tin người dùng
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => navigate("/order-history")}>
      <ShoppingOutlined />
Xem đơn hàng của bạn      </WrapperContentPopup>
      {(() => {
        const isAdminUser = Boolean(user?.isAdmin);
        console.log("Rendering admin menu check:", {
          rawIsAdmin: user?.isAdmin,
          convertedIsAdmin: isAdminUser,
          strictCheck: user?.isAdmin === true
        });
        
        return user?.isAdmin === true ? (
          <WrapperContentPopup onClick={() => navigate("/system/admin")}>
            <ShopOutlined />
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
    <div
    style={{
      backgroundImage: "url('https://cms-prod.s3-sgn09.fptcloud.com/dk_76091224ce.png')",
      backgroundSize: "cover", // Để ảnh phủ kín toàn bộ
      backgroundPosition: "center", // Căn chỉnh ảnh
      backgroundRepeat: "no-repeat", // Không lặp ảnh
      width: "100%",
    }}
    >

      <WrapperHeader gutter={16} style={{ justifyContent: "space-between" }}>
        <Col span={5}>
        <WrapperHeaderText onClick={handleNavigateHome}>
  <img 
    src={logo} 
    alt="Logo" 
  />
</WrapperHeaderText>

        </Col>

        {!isHiddenSearch && (
          <Col span={12}>
  <ButtonInputSearch size="large" textButton="Search" placeHolder="Input search text" />
          </Col>
        )}

        <Col span={7} style={{ display: "flex", gap: "20px" }}>
          <Loading isLoading={loading}>
            <WrapperHeaderAccount>
              <div style={{ display: "flex", gap: "10px" ,alignItems:"center", marginBottom:"5px",}}>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alter="avatar"
                  style={{
                    height: "40px",
                    width: "40px",
                    marginBottom:"5px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}
              {user?.accessToken ? (
                <>
                  <Popover content={content} trigger="hover" 
                  overlayStyle={{
                    backgroundColor: "#f0f0f0", // Màu nền của toàn bộ popover
                    borderRadius: "10px",       // Bo góc cho toàn bộ popover
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Hiệu ứng đổ bóng
                    padding:"0px",   
                    maxWidth: "200px",          // Giới hạn chiều rộng tối đa
                    overflow: "hidden", 
                  }}
                  overlayInnerStyle={{
                    padding: "0px", 
                    margin:"0px",
                    color: "#333",             // Màu chữ của nội dung
                    fontSize: "14px",          // Kích thước chữ
                  }}>
                    <div style={{ cursor: "pointer",
                    }}>
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
              </div>
            </WrapperHeaderAccount>
          </Loading>

          {!isHiddenCart && (
            <WrapperHeaderAccount onClick={handleNavigateCart} style={{ cursor: 'pointer' }}>
              <div
              style={{
                display:"flex",
                gap:"7px",
                alignItems: "center",
                background:"#264FD4",
                padding:"5px",
                paddingLeft:"10px",
                paddingRight:"10px",
                borderRadius:"20px",
position:"absolute",
top:"18px"


              }}
              >
              <Badge count={cartItemCount} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "white"
 }}
                />
              </Badge>
              <span>Giỏ hàng</span>
              </div>
            </WrapperHeaderAccount>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
