import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, Input, Select, Table } from 'antd';
import { WrapperOrder, OrderInfo, CartItems, PaymentInfo } from './style';
import * as CartService from '../../service/CartService';
import Loading from '../../components/LoadingComponent/Loading';

const OrderPage = () => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);

  const { isLoading, data: cartData } = useQuery({
    queryKey: ['cart', user?.id],
    queryFn: () => CartService.getUserCart(user?.id),
    enabled: !!user?.id
  });
  
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={record.image} alt={text} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
      render: (_, record) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.price * record.quantity),
    },
  ];

  const handleSubmitOrder = (values) => {
    console.log('Form values:', values);
    // TODO: Implement order submission
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
            }}
            onFinish={handleSubmitOrder}
          >
            <Form.Item
              name="name"
              label="Họ tên"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="payment"
              label="Phương thức thanh toán"
              rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
            >
              <Select>
                <Select.Option value="cod">Thanh toán khi nhận hàng</Select.Option>
                <Select.Option value="banking">Chuyển khoản ngân hàng</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </OrderInfo>

        <CartItems>
          <h2>Giỏ hàng</h2>
          <Table 
            columns={columns}
            dataSource={cartData?.data?.items?.map(item => ({
              key: item.product._id,
              name: item.product.name,
              image: item.product.image,
              price: item.price,
              quantity: item.quantity,
              total: item.totalPrice
            }))}
            pagination={false}
            summary={(pageData) => {
              const total = cartData?.data?.totalAmount || 0;
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={3}><strong>Tổng cộng</strong></Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <strong>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                    </strong>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />

          <PaymentInfo>
            <Button 
              type="primary" 
              size="large" 
              onClick={() => form.submit()}
              disabled={!cartData?.data?.items?.length}
            >
              Đặt hàng
            </Button>
          </PaymentInfo>
        </CartItems>
      </WrapperOrder>
    </Loading>
  );
};

export default OrderPage;
