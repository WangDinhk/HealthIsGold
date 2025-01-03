import { Menu } from "antd";
import React, { useState } from "react";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { getItem } from "../../utils";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import * as AdminService from '../../service/AdminService';
import Loading from '../../components/LoadingComponent/Loading';

const AdminPage = () => {
  const items = [
    getItem("Người dùng", "user", <UserOutlined />),
    getItem("Sản phẩm", "product", <AppstoreOutlined />),
  ];

  const [keySelected, setKeySelected] = useState("");

  const user = useSelector((state) => state.user);
  
  const { isLoading, data: adminData } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: () => AdminService.getDashboardData(),
    staleTime: 2 * 60 * 1000, // Cache 2 phút cho admin
    cacheTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!user?.isAdmin // Only fetch if user is admin
  });

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      default:
        return <> </>;
    }
  };

  const handleClick = ({ key }) => {
    setKeySelected(key);
  };

  console.log("keySelected", keySelected);

  if (isLoading) return <Loading />;

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            height: "100vh",
            boxShadow: "1px 1px 2px #ccc",
          }}
          items={items}
          onClick={handleClick}
        />
        <div style={{ flex: 1 , padding : '20px'}}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
