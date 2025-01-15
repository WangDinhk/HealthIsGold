import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  Select,
  Table,
  InputNumber,
  Popconfirm,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { WrapperOrder, OrderInfo, CartItems, PaymentInfo } from "./style";
import * as CartService from "../../service/CartService";
import Loading from "../../components/LoadingComponent/Loading";
import {
  updateQuantitySuccess,
  removeFromCartSuccess,
} from "../../redux/slides/cartSlide";
import { deleteCart } from "../../service/UserService";
import { createOrder } from "../../service/OrderService";

const OrderPage = () => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [payment, setPayment] = useState("cod");

  const { isLoading, data: cartData } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: () => CartService.getUserCart(user?.id),
    enabled: !!user?.id,
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ productId, quantity }) =>
      CartService.updateCartItemQuantity(user?.id, productId, quantity),
    onSuccess: (_, variables) => {
      dispatch(updateQuantitySuccess(variables));
      queryClient.invalidateQueries(["cart", user?.id]);
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (productId) => CartService.removeCartItem(user?.id, productId),
    onSuccess: (_, productId) => {
      dispatch(removeFromCartSuccess(productId));
      queryClient.invalidateQueries(["cart", user?.id]);
    },
  });

  const [localCartItems, setLocalCartItems] = useState([]);

  useEffect(() => {
    if (cartData?.data?.items) {
      setLocalCartItems(cartData.data.items);
    }
  }, [cartData?.data?.items]);

  const totalAmount = useMemo(() => {
    return localCartItems.reduce((total, item) => {
      // Tính giá sau khi giảm giá
      const discountedPrice =
        item.price * (1 - (item.product.discount || 0) / 100);
      return total + discountedPrice * item.quantity;
    }, 0);
  }, [localCartItems]);

  const handleQuantityChange = async (productId, quantity) => {
    const product = localCartItems.find(
      (item) => item.product._id === productId
    );
    if (!product) return;

    try {
      if (quantity > product.product.countInStock) {
        message.error(
          `Chỉ còn ${product.product.countInStock} sản phẩm trong kho`
        );
        return;
      }

      if (quantity <= 0) {
        message.error("Số lượng phải lớn hơn 0");
        return;
      }

      setLocalCartItems((prev) =>
        prev.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      );

      await updateQuantityMutation.mutateAsync({
        productId,
        quantity,
        countInStock: product.product.countInStock,
      });
    } catch (error) {
      message.error("Không thể cập nhật số lượng: " + error.message);
      // Reset to previous state on error
      setLocalCartItems(cartData?.data?.items || []);
    }
  };

  const handlePaymentChange = (value) => {
    setPayment(value); // Cập nhật trạng thái khi thay đổi phương thức thanh toán
  };

  const handleRemoveItem = (productId) => {
    setLocalCartItems((prev) =>
      prev.filter((item) => item.product._id !== productId)
    );

    removeItemMutation.mutate(productId);
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={record.image}
            alt={text}
            style={{ width: "50px", height: "50px", objectFit: "contain" }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price, record) => {
        const discountedPrice = price * (1 - (record.discount || 0) / 100);
        return (
          <div>
            <div>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(discountedPrice)}
            </div>
            {record.discount > 0 && (
              <div
                style={{
                  textDecoration: "line-through",
                  color: "#999",
                  fontSize: "12px",
                }}
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(price)}
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <div>
          <InputNumber
            min={1}
            max={record.countInStock}
            value={record.quantity}
            onChange={(value) => handleQuantityChange(record.key, value)}
          />
          <div style={{ fontSize: "12px", color: "#888" }}>
            Còn {record.countInStock} sản phẩm
          </div>
        </div>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (_, record) => {
        const item = localCartItems.find(
          (item) => item.product._id === record.key
        );
        if (!item) return null;

        const discountedPrice =
          item.price * (1 - (item.product.discount || 0) / 100);
        const total = discountedPrice * item.quantity;

        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(total);
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Bạn có chắc muốn xóa sản phẩm này?"
          onConfirm={() => handleRemoveItem(record.key)}
          okText="Có"
          cancelText="Không"
        >
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];
  const navigate = useNavigate(); // Khởi tạo điều hướng
  ///////////////////////////////////////////////
  // TODO: Implement order submission
  // Momo app test: https://developers.momo.vn/v3/vi/docs/payment/onboarding/test-instructions/
  // Napas:
  //          Tên	                Số thẻ	             Hạn ghi trên thẻ	            OTP	          SDT
  //      NGUYEN VAN A	    9704 0000 0000 0018	             03/07	                OTP	     (Tùy ý, đúng đầu số là được)
  // Credit Cards:
  //          Tên	                Số thẻ	             Hạn ghi trên thẻ	     CVC           OTP
  //      NGUYEN VAN A	    5200 0000 0000 1096	             05/25	         111       (Được cho)
  // const handleSubmitOrder = async (values) => {
  //   console.log("Form values:", values);
  //   ////////////////////////////////////////////////
  //   try {
  //     const orderItem = localCartItems.map((item) => ({
  //       product: item.product._id,
  //       name: item.product.name,
  //       image: item.product.image,
  //       price: item.price,
  //       quantity: item.quantity,
  //     }));
  //     if (payment === "banking") {
  //       const partnerCode = "HIGMomo";
  //       const orderInfo = {
  //         OrderID: partnerCode + new Date().getTime(),
  //         Money: totalAmount,
  //       };
  //       const response = await CartService.createMomoPayment(orderInfo);
  //       console.log(response);
  //       const payUrl = response.payUrl;
  //       window.location.href = payUrl;

  //       if (response.resultCode === 0) {
  //         form.submit();
  //       }
  //     } else {
  //       form.submit();
  //     }

  //     const shipAddress = values.address;
  //     const paymentMethod = values.payment;
  //     const totalPrice = totalAmount;
  // console.log('loại thanh toán: ',paymentMethod);
  //     const response = await createOrder(
  //       orderItem,
  //       shipAddress,
  //       paymentMethod,
  //       totalPrice
  //     );
  //     navigate("/");

  //     await handleDeleteCart();

  //     message.success("Đơn hàng đã được tạo thành công!");
  //     console.log("Order response:", response);

  //     form.resetFields();
  //   } catch (error) {
  //     message.error("Không thể tạo đơn hàng: " + error.message);
  //     console.error("Error submitting order:", error);
  //   }
  // };
  const handleSubmitOrder = async (values) => {
    console.log("Form values:", values);

    try {
      const orderItem = localCartItems.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        image: item.product.image,
        price: item.price,
        quantity: item.quantity,
      }));

      if (payment === "banking") {
        // Tạo thông tin thanh toán MoMo
        const partnerCode = "HIGMomo";
        const orderInfo = {
          OrderID: partnerCode + new Date().getTime(),
          Money: totalAmount,
          returnUrl: `${window.location.origin}/payment-result`, // URL callback sau khi thanh toán
        };

        const response = await CartService.createMomoPayment(orderInfo);
        console.log(response);

        if (response.payUrl) {
          await processOrder(values, orderItem);

          // Chuyển hướng đến trang thanh toán MoMo
          window.location.href = response.payUrl;
          await handleDeleteCart();
        } else {
          throw new Error("Không thể tạo liên kết thanh toán.");
        }
      } else {
        // Thanh toán khi nhận hàng
        await processOrder(values, orderItem);
      }
    } catch (error) {
      message.error("Không thể tạo đơn hàng: " + error.message);
      console.error("Error submitting order:", error);
    }
  };

  // Hàm xử lý đơn hàng sau khi thanh toán thành công
  const processOrder = async (values, orderItem) => {
    const shipAddress = values.address;
    const paymentMethod = values.payment;
    const totalPrice = totalAmount;
    const phone = values.phone;
    const name = values.name;

    console.log("Loại thanh toán:", paymentMethod);

    const response = await createOrder(
      orderItem,
      shipAddress,
      paymentMethod,
      totalPrice,
      phone,
      name
    );
    await handleDeleteCart();

    message.success("Đơn hàng đã được tạo thành công!");
    console.log("Order response:", response);

    form.resetFields();
    navigate("/");
  };

  const handleDeleteCart = async () => {
    try {
      await deleteCart(user?.id); // Gọi API xóa giỏ hàng
      setLocalCartItems([]); // Xóa dữ liệu giỏ hàng trên giao diện
      queryClient.invalidateQueries(["cart", user?.id]); // Làm mới dữ liệu giỏ hàng
      console.log("Giỏ hàng đã được xóa thành công!");
    } catch (error) {
      console.log("Không thể xóa giỏ hàng: " + error.message);
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <WrapperOrder>
        <OrderInfo>
          <h2>Thông tin đặt hàng</h2>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              name: user?.name,
              phone: user?.phone,
              address: user?.address,
              payment: "cod", // Giá trị mặc định
            }}
            onFinish={handleSubmitOrder} // Chạy khi submit form
          >
            <Form.Item
              name="name"
              label="Họ tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="payment"
              label="Phương thức thanh toán"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phương thức thanh toán",
                },
              ]}
            >
              <Select onChange={handlePaymentChange}>
                <Select.Option value="cod">
                  Thanh toán khi nhận hàng
                </Select.Option>
                <Select.Option value="banking">
                  Chuyển khoản qua MOMO
                </Select.Option>
              </Select>
            </Form.Item>

            {/* Nút submit form */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit" // Kích hoạt onFinish khi nhấn
                size="large"
                style={{ width: "180px", marginLeft: "80px" }}
                disabled={!cartData?.data?.items?.length}
              >
                {payment === "banking" ? "Thanh toán đơn hàng" : "Đặt hàng"}
              </Button>
            </Form.Item>
          </Form>
        </OrderInfo>

        <CartItems>
          <h2>Giỏ hàng</h2>
          <Table
            columns={columns}
            dataSource={localCartItems.map((item) => ({
              key: item.product._id,
              name: item.product.name,
              image: item.product.image,
              price: item.price,
              discount: item.product.discount,
              quantity: item.quantity,
              countInStock: item.product.countInStock,
              total: item.price * item.quantity,
            }))}
            pagination={false}
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={3}>
                  <strong>Tổng cộng</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <strong>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalAmount)}
                  </strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            )}
          />
        </CartItems>
      </WrapperOrder>
    </Loading>
  );
};

export default OrderPage;
