import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Form} from "antd";
import React from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import {useState} from "react"
import InputComponent from "../InputComponent/InputComponent"
import { getBase64 } from "../../utils";
import create from "@ant-design/icons/lib/components/IconFont";
import { createProduct } from "../../service/ProductService";
import * as ProductService  from "../../service/ProductService";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from "../Message/Message"
import { useEffect } from "react";
const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateProduct,setStateProduct] = useState({
    name: "",
    image:"",
    type:"",
    price:"",
    discount:"",
    countInStock:"",
    manufacturer:"",
    description:"",
    unit:"",
    country:"",
    target:"",
    quantity:"",
    ingredient:""
  })

  const [form] = Form.useForm();

  const mutation = useMutationHook(
    (data) => {
    const { 
    name,
    image,
    type,
    price,
    discount,
    countInStock,
    manufacturer,
    description,
    unit,
    country,
    target,
    quantity,
    ingredient
   
    } = data;
    const res= ProductService.createProduct( data);
    return res;
})
const {data,isLoading,isSuccess,isError}= mutation;

useEffect(()=>{
  message.success();
  if(isSuccess && data?.status === 'OK'){
    handleCancel()
  } else if(isError){
    message.error();
  }
},[isSuccess])

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      image:"",
      type:"",
      price:"",
      discount:"",
      countInStock:"",
      manufacturer:"",
      description:"",
      unit:"",
      country:"",
      target:"",
      quantity:"",
      ingredient:""
      })
      form.resetFields();
  };

  const onFinish = () =>{
   mutation.mutate(stateProduct)
    console.log('Finish',stateProduct);
  }

  const handleOnchange=(e)=>{
    setStateProduct({
      ...stateProduct,
      [e.target.name]:e.target.value
    })
  }
  const handleOnchangeAvatar = async (filelist) => {
    const file = filelist[0];

    if (!file) {
        console.error("Không có file nào được chọn.");
        return;
    }

    try {
        // Kiểm tra và tạo preview từ file
        const preview = await getBase64(file.originFileObj);
        
        // Cập nhật state
        setStateProduct({
            ...stateProduct,
            image: preview, // Lưu preview vào state
        });

        console.log("Preview của hình ảnh:", preview);
    } catch (error) {
        console.error("Lỗi khi xử lý file:", error);
    }
};

  return (
    <div>
      <WrapperHeader> Quản Lí Sản Phẩm </WrapperHeader>
      <div style={{ marginTop: "20px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick = {()=> setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />{" "}
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent />
      </div>
      <Modal title="Tạo sản phẩm" open={isModalOpen}  onCancel={handleCancel} footer={[
                      <Button key="cancel" onClick={handleCancel}>Hủy</Button>
      ]}  >
        <Loading isLoading={isLoading}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <InputComponent value ={stateProduct.name} onChange = {handleOnchange} name="name"/>
          </Form.Item>
          <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Please input your type!' }]}
        >
          <InputComponent value ={stateProduct.type} onChange = {handleOnchange} name="type"/>
          </Form.Item>
      
          <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input your price!' }]}
        >
          <InputComponent value ={stateProduct.price} onChange = {handleOnchange} name="price"/>
          </Form.Item>
          <Form.Item
          label="Discount"
          name="discount"
          rules={[{ required: true, message: 'Please input your discount!' }]}
        >
          <InputComponent value ={stateProduct.discount} onChange = {handleOnchange} name="discount"/>
          </Form.Item>
          <Form.Item
          label="Count inStock"
          name="countInStock"
          rules={[{ required: true, message: 'Please input your count inStock!' }]}
        >
          <InputComponent value ={stateProduct.countInStock} onChange = {handleOnchange} name="countInStock"/>
          </Form.Item>
          <Form.Item
          label="Manufacturer"
          name="manufacturer"
          rules={[{ required: true, message: 'Please input your manufacturer!' }]}
        >
          <InputComponent value ={stateProduct.manufacturer} onChange = {handleOnchange} name="manufacturer"/>
          </Form.Item>
          <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <InputComponent value ={stateProduct.description} onChange = {handleOnchange} name="description"/>
          </Form.Item>
          <Form.Item
          label="Unit"
          name="unit"
          rules={[{ required: true, message: 'Please input your unit!' }]}
        >
          <InputComponent value ={stateProduct.unit} onChange = {handleOnchange} name="unit"/>
          </Form.Item>
          <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: 'Please input your country!' }]}
        >
          <InputComponent value ={stateProduct.country} onChange = {handleOnchange} name="country"/>
          </Form.Item>
          <Form.Item
          label="Target"
          name="target"
          rules={[{ required: true, message: 'Please input your target!' }]}
        >
          <InputComponent value ={stateProduct.target} onChange = {handleOnchange} name="target"/>
          </Form.Item>
          <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: 'Please input your quantity!' }]}
        >
          <InputComponent value ={stateProduct.quantity} onChange = {handleOnchange} name="quantity"/>
          </Form.Item>
          <Form.Item
          label="Ingredient"
          name="ingredient"
          rules={[{ required: true, message: 'Please input your ingredient!' }]}
        >
          <InputComponent value ={stateProduct.ingredient} onChange = {handleOnchange} name="ingredient"/>
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: 'Please input your image!' }]}
          >
            <WrapperUploadFile
              onChange={({ fileList }) => handleOnchangeAvatar(fileList)} // Gọi hàm khi file thay đổi
              maxCount={3}
            >
              <Button>Click to Upload</Button>
              {stateProduct?.image && (
                <img
                  src={stateProduct?.image} // Đúng thuộc tính `src`
                  style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px',
                  }}
                  alt="avatar"
                />
              )}
            </WrapperUploadFile>
          </Form.Item>

          
          <Form.Item label={null}   wrapperCol={{offset :20,span:16}}>
            <Button type="primary"
             htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </Loading>
      </Modal>
    </div>
  );
};

export default AdminProduct;
