import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Modal, Form, Space } from "antd";
import React, { useRef } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import create from "@ant-design/icons/lib/components/IconFont";
import { createProduct } from "../../service/ProductService";
import * as ProductService from "../../service/ProductService";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from "../Message/Message";
import { useEffect } from "react";
import imageCompression from "browser-image-compression";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const user = useSelector((state) => state?.user);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    discount: "",
    countInStock: "",
    manufacturer: "",
    description: "",
    unit: "",
    country: "",
    target: "",
    quantity: "",
    ingredient: "",
  });
  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    discount: "",
    countInStock: "",
    manufacturer: "",
    description: "",
    unit: "",
    country: "",
    target: "",
    quantity: "",
    ingredient: "",
  });
  const [form] = Form.useForm();

  const mutation = useMutationHook((data) => {
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
      ingredient,
    } = data;
    const res = ProductService.createProduct(data);
    return res;
  });

  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    console.log("Kết quả trả về từ API:", res);
    return res;
  });
  const mutationDeleted = useMutationHook((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  useEffect(() => {
    if (stateProductDetails) {
      form.setFieldsValue(stateProductDetails); // Đảm bảo cập nhật đúng khi stateProductDetails thay đổi
    }
  }, [stateProductDetails, form]);

  const { data, isLoading, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationUpdate;

  console.log("dataUpdated", dataUpdated);
  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const { isLoading: isLoadingProducts, data: products } = queryProduct;
  const renderAction = () => {
    return (
      <div style={{ display: "flex" }}>
        <div>
          <DeleteOutlined
            style={{
              color: "red",
              fontSize: "24px",
              cursor: "pointer",
              paddingRight: "20px",
            }}
            onClick={() => setIsModalOpenDelete(true)}
          />
        </div>
        <EditOutlined
          onClick={handleDetailsProduct}
          style={{
            color: "blue",
            fontSize: "24px",
            cursor: "pointer",
            paddingRight: "10px",
          }}
        />
      </div>
    );
  };
  //==================================

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0] || ""}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />

        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>

          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase()),

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  // ==================================
  console.log("data", products);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">= 2",
          value: ">=",
        },
        {
          text: "<= 2",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price >= 2;
        }
        return record.price <= 2;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: ">= 2",
          value: ">=",
        },
        {
          text: "<= 2",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.rating >= 2;
        }
        return record.rating <= 2;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
    });
  console.log("dataTable:", dataTable);

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      // message.success();
      handleCloseDrawer();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDeleted]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      image: "",
      type: "",
      price: "",
      discount: "",
      countInStock: "",
      manufacturer: "",
      description: "",
      unit: "",
      country: "",
      target: "",
      quantity: "",
      ingredient: "",
    });
    form.resetFields();
  };
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      setIsLoadingUpdate(false); // Reset trạng thái tải
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
      setIsLoadingUpdate(false); // Reset trạng thái tải khi có lỗi
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
      },
      {
        onSettled: () => {
          setIsModalOpenDelete(false); // Đóng popup sau khi xóa thành công
          queryProduct.refetch(); // Làm mới danh sách sản phẩm
        },
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      image: "",
      type: "",
      price: "",
      discount: "",
      countInStock: "",
      manufacturer: "",
      description: "",
      unit: "",
      country: "",
      target: "",
      quantity: "",
      ingredient: "",
    });
    form.resetFields();
  };

  const onFinish = () => {
    mutation.mutate(stateProduct, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };
  const fetchGetDetailsProduct = async (rowSelected) => {
    try {
      const res = await ProductService.getDetailsProduct(rowSelected);
      if (res?.data) {
        setStateProductDetails({
          name: res.data.name || "",
          image: res.data.image || "",
          type: res.data.type || "",
          price: res.data.price || "",
          discount: res.data.discount || "",
          countInStock: res.data.countInStock || "",
          manufacturer: res.data.manufacturer || "",
          description: res.data.description || "",
          unit: res.data.unit || "",
          country: res.data.country || "",
          target: res.data.target || "",
          quantity: res.data.quantity || "",
          ingredient: res.data.ingredient || "",
        });
      }
      setIsLoadingUpdate(false); // Dừng tải sau khi hoàn tất
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      setIsLoadingUpdate(false); // Dừng tải nếu có lỗi
    }
  };

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected]);
  // console.log("stateProductDetails",stateProductDetails);
  const handleDetailsProduct = () => {
    if (rowSelected) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected); // Truyền rowSelected vào hàm
    }
    setIsOpenDrawer(true);
  };

  const handleOnchangeAvatar = async (fileList) => {
    const file = fileList[0];

    if (!file) return;

    try {
      // Cấu hình nén
      const options = {
        maxSizeMB: 1, // Giới hạn kích thước ảnh (MB)
        maxWidthOrHeight: 1920, // Kích thước tối đa
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(
        file.originFileObj,
        options
      );
      const preview = await getBase64(compressedFile);

      setStateProduct({
        ...stateProduct,
        image: preview, // Lưu base64 đã được nén
      });
    } catch (error) {
      console.error("Lỗi khi nén ảnh:", error);
    }
  };

  const handleOnchangeAvatarDetails = async (fileList) => {
    const file = fileList[0];

    if (!file) return;

    try {
      // Cấu hình nén
      const options = {
        maxSizeMB: 1, // Giới hạn kích thước ảnh (MB)
        maxWidthOrHeight: 1920, // Kích thước tối đa
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(
        file.originFileObj,
        options
      );
      const preview = await getBase64(compressedFile);

      setStateProductDetails({
        ...stateProductDetails,
        image: preview, // Lưu base64 đã được nén
      });
    } catch (error) {
      console.error("Lỗi khi nén ảnh:", error);
    }
  };
  console.log("user", user);
  const onUpdateProduct = async () => {
    console.log("Bắt đầu gọi mutationUpdate.mutate...");
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.accessToken,
        ...stateProductDetails,
      },
      {
        onSuccess: (data) => {
          console.log("Mutation thành công, dữ liệu trả về:", data);
          // setDataUpdated(data); // Cập nhật state
        },
        onError: (error) => {
          console.error("Mutation thất bại:", error);
        },
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
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
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />{" "}
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isLoading={isLoadingProducts}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              }, // click row
            };
          }}
        />
      </div>
      <ModalComponent
        forceRender
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Loading isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateProduct.name}
                onChange={handleOnchange}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please input your type!" }]}
            >
              <InputComponent
                value={stateProduct.type}
                onChange={handleOnchange}
                name="type"
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input your price!" }]}
            >
              <InputComponent
                value={stateProduct.price}
                onChange={handleOnchange}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                { required: true, message: "Please input your discount!" },
              ]}
            >
              <InputComponent
                value={stateProduct.discount}
                onChange={handleOnchange}
                name="discount"
              />
            </Form.Item>
            <Form.Item
              label="Count inStock"
              name="countInStock"
              rules={[
                { required: true, message: "Please input your count inStock!" },
              ]}
            >
              <InputComponent
                value={stateProduct.countInStock}
                onChange={handleOnchange}
                name="countInStock"
              />
            </Form.Item>
            <Form.Item
              label="Manufacturer"
              name="manufacturer"
              rules={[
                { required: true, message: "Please input your manufacturer!" },
              ]}
            >
              <InputComponent
                value={stateProduct.manufacturer}
                onChange={handleOnchange}
                name="manufacturer"
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <InputComponent
                value={stateProduct.description}
                onChange={handleOnchange}
                name="description"
              />
            </Form.Item>
            <Form.Item
              label="Unit"
              name="unit"
              rules={[{ required: true, message: "Please input your unit!" }]}
            >
              <InputComponent
                value={stateProduct.unit}
                onChange={handleOnchange}
                name="unit"
              />
            </Form.Item>
            <Form.Item
              label="Country"
              name="country"
              rules={[
                { required: true, message: "Please input your country!" },
              ]}
            >
              <InputComponent
                value={stateProduct.country}
                onChange={handleOnchange}
                name="country"
              />
            </Form.Item>
            <Form.Item
              label="Target"
              name="target"
              rules={[{ required: true, message: "Please input your target!" }]}
            >
              <InputComponent
                value={stateProduct.target}
                onChange={handleOnchange}
                name="target"
              />
            </Form.Item>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                { required: true, message: "Please input your quantity!" },
              ]}
            >
              <InputComponent
                value={stateProduct.quantity}
                onChange={handleOnchange}
                name="quantity"
              />
            </Form.Item>
            <Form.Item
              label="Ingredient"
              name="ingredient"
              rules={[
                { required: true, message: "Please input your ingredient!" },
              ]}
            >
              <InputComponent
                value={stateProduct.ingredient}
                onChange={handleOnchange}
                name="ingredient"
              />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please input your image!" }]}
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
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item label={null} wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="60%"
      >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
            onFinish={onUpdateProduct}
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateProductDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please input your type!" }]}
            >
              <InputComponent
                value={stateProductDetails.type}
                onChange={handleOnchangeDetails}
                name="type"
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input your price!" }]}
            >
              <InputComponent
                value={stateProductDetails.price}
                onChange={handleOnchangeDetails}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                { required: true, message: "Please input your discount!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.discount}
                onChange={handleOnchangeDetails}
                name="discount"
              />
            </Form.Item>
            <Form.Item
              label="Count inStock"
              name="countInStock"
              rules={[
                { required: true, message: "Please input your count inStock!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.countInStock}
                onChange={handleOnchangeDetails}
                name="countInStock"
              />
            </Form.Item>
            <Form.Item
              label="Manufacturer"
              name="manufacturer"
              rules={[
                { required: true, message: "Please input your manufacturer!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.manufacturer}
                onChange={handleOnchangeDetails}
                name="manufacturer"
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.description}
                onChange={handleOnchangeDetails}
                name="description"
              />
            </Form.Item>
            <Form.Item
              label="Unit"
              name="unit"
              rules={[{ required: true, message: "Please input your unit!" }]}
            >
              <InputComponent
                value={stateProductDetails.unit}
                onChange={handleOnchangeDetails}
                name="unit"
              />
            </Form.Item>
            <Form.Item
              label="Country"
              name="country"
              rules={[
                { required: true, message: "Please input your country!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.country}
                onChange={handleOnchangeDetails}
                name="country"
              />
            </Form.Item>
            <Form.Item
              label="Target"
              name="target"
              rules={[{ required: true, message: "Please input your target!" }]}
            >
              <InputComponent
                value={stateProductDetails.target}
                onChange={handleOnchangeDetails}
                name="target"
              />
            </Form.Item>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                { required: true, message: "Please input your quantity!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.quantity}
                onChange={handleOnchangeDetails}
                name="quantity"
              />
            </Form.Item>
            <Form.Item
              label="Ingredient"
              name="ingredient"
              rules={[
                { required: true, message: "Please input your ingredient!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.ingredient}
                onChange={handleOnchangeDetails}
                name="ingredient"
              />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please input your image!" }]}
            >
              <WrapperUploadFile
                onChange={({ fileList }) =>
                  handleOnchangeAvatarDetails(fileList)
                } // Gọi hàm khi file thay đổi
                maxCount={3}
              >
                <Button>Click to Upload</Button>
                {stateProductDetails?.image && (
                  <img
                    src={stateProductDetails?.image} // Đúng thuộc tính `src`
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item label={null} wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa sản phẩm này không</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;
