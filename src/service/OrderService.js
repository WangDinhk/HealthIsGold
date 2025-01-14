import axios from "axios";

import Cookies from "js-cookie";

const getRefreshToken = () => {
  return Cookies.get("refreshToken");
};
export const createOrder = async (orderItem, shipAddress, PaymentMethod, totalPrice) => {
    try {
      const refreshToken = getRefreshToken(); // Lấy refreshToken từ cookie
  
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/order/create`,
        {
          orderItem, // Danh sách sản phẩm trong đơn hàng
          shipAddress, // Địa chỉ giao hàng
          PaymentMethod, // Phương thức thanh toán
          totalPrice, // Tổng giá trị đơn hàng
        },
        {
          headers: {
            token: `Bearer ${refreshToken}`, // Sử dụng refreshToken
          },
        }
      );
      return res.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error("Error creating order:", error.response?.data || error.message);
      throw error; // Ném lỗi ra để xử lý ở nơi gọi hàm
    }
  };
  


export const getAllOrders = async (token) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/getAll`, {
            headers: {
                token: `Bearer ${token}`,
            },
        });
        return res.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Error fetching all orders:", error.response?.data || error.message);
        throw error; // Ném lỗi ra để xử lý ở nơi gọi hàm
    }
};


export const getDetailOrder = async (orderId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/getDetail/${orderId}`);
    return res.data;
};
