import { Menu } from "antd";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { getItem } from "../../utils";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import { useSelector } from "react-redux";
import { WrapperContentAdmin, WrapperContentProfile, WrapperHeader } from "./style";
import AdminOrder from "../../components/AdminOrder/AdminOrder";
import Loading from '../../components/LoadingComponent/Loading'
import UserOrder from "../../components/UserOrder/UserOrder";

const OrderHistoryPage = () => {
    
    return (
        <div style={{  margin: '0 auto', padding: '20px' ,background:'#EEF0F3'}}>
                <WrapperContentProfile>
                <WrapperHeader>Xem đơn hàng của bạn</WrapperHeader>
<UserOrder/>
                    
                </WrapperContentProfile>
        </div>
    )
}

export default OrderHistoryPage