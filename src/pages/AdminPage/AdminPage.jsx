import { Menu } from "antd";
import React, { useState } from "react";
import { 
  AppstoreOutlined,
  TeamOutlined
} from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { getItem } from "../../utils";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import { useSelector } from 'react-redux';
import { WrapperContentAdmin } from './style';

const AdminPage = () => {
  const items = [
    getItem("Người dùng", "user", <TeamOutlined />),
    getItem("Sản phẩm", "product", <AppstoreOutlined />),
  ];

  const [keySelected, setKeySelected] = useState("user");
  const user = useSelector((state) => state.user);

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      default:
        return <></>;
    }
  };

  const handleClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: "flex", overflowX: "hidden" }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            minHeight: "100vh",
            boxShadow: "1px 1px 2px #ccc",
            backgroundColor: "#001529",
            color: "white"
          }}
          items={items}
          onClick={handleClick}
          selectedKeys={[keySelected]}
          theme="dark"
        />
        <WrapperContentAdmin>
          {renderPage(keySelected)}
        </WrapperContentAdmin>
      </div>
    </>
  );
};

export default AdminPage;
