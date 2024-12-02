import { Menu } from "antd";
import React, { useState } from "react";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

const AdminPage = () => {
  const items = [
    getItem("Người dùng", "user", <UserOutlined />),
    getItem("Sản phẩm", "product", <AppstoreOutlined />),
  ];

  const [keySelected, setKeySelected] = useState("");
  const handleClick = ({ key }) => {
    setKeySelected(key);
  };
  console.log("keySelected", keySelected);
  return;
  <>
    <HeaderComponent isHiddenSearch isHiddenCart />
    <div>
      <Menu
        mode="inline"
        style={{
          width: 256,
          height: "100vh",
          boxShadow: "1px 1px 2px #ccc",
        }}
        items={items}
        onClick={handleOnClick}
      />
      <div style={{ flex: 1 }}>
        <span> test </span>
      </div>
    </div>
  </>;
};

export default AdminPage;