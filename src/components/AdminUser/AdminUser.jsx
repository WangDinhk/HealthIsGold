import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, message, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";
import ModalComponent from "../ModalComponent/ModalComponent";
import { getBase64 } from "../../utils";
import { useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as UserService from "../../service/UserService";
import { useQuery } from "@tanstack/react-query";
import imageCompression from "browser-image-compression";


const AdminUser = () => {
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
  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
  
  });
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
  });
  const [form] = Form.useForm();


  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.UpdateUser(id, { ...rests },token);
    console.log("Kết quả trả về từ API:", res);

    return res;
  });
  const mutationDeleted = useMutationHook((data) => {
    const { id, token } = data;
    const res = UserService.deleteUser(id, token);
    return res;
  });


  
  const getAllUsers = async () => {
    try {
      const response = await UserService.getAllUser(user?.accessToken); // Giả sử API yêu cầu accessToken
      return response?.data || []; // Đảm bảo trả về mảng, ngay cả khi không có dữ liệu
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error; // Để React Query xử lý lỗi
    }
  };

  useEffect(() => {
    if (stateUserDetails) {
      form.setFieldsValue(stateUserDetails); // Đảm bảo cập nhật đúng khi stateProductDetails thay đổi
    }
  }, [stateUserDetails, form]);

  // const { data, isLoading, isSuccess, isError } = mutation;
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
  //////////////////////////////////
  const queryUser = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 2 * 60 * 1000, // Cache 2 phút cho admin
    cacheTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false
  });
  const { isLoading: isLoadingUsers, data: users } = queryUser;
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
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
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />

        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
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
    onFilter: (value, record) => {
      const cellValue = record[dataIndex];
      return cellValue
        ? cellValue.toString().toLowerCase().includes(value.toString().toLowerCase())
        : false;
    },
    

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  // ==================================
  console.log("data", users);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => (a.name || "").localeCompare(b.name || ""), // Xử lý undefined
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => (a.email || "").localeCompare(b.email || ""), // Xử lý undefined
      ...getColumnSearchProps("email"),
    },
    {
      title: "Is Admin",
      dataIndex: "isAdmin",
      render: (isAdmin) => (isAdmin ? "true" : "false"), // Tùy chỉnh hiển thị
      filters: [
        {
          text: "true",
          value: true, // Giá trị boolean thay vì chuỗi
        },
        {
          text: "false",
          value: false, // Giá trị boolean thay vì chuỗi
        },
      ],
      onFilter: (value, record) => record.isAdmin === value, // So sánh trực tiếp kiểu boolean
    },
    {
      title: "Phone",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable =
  Array.isArray(users) && users.length > 0
    ? users.map((product) => ({ ...product, key: product._id }))
    : [];

console.log("dataTable:", dataTable);
  console.log("dataTable:", dataTable);

  // useEffect(() => {
  //   if (isSuccess && data?.status === "OK") {
  //     message.success();
  //     handleCancel();
  //   } else if (isError) {
  //     message.error();
  //   }
  // }, [isSuccess]);

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
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
      
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
  // const handleDeleteUser = async () => {
  //   try {
  //     // Kiểm tra giá trị rowSelected
  //     console.log("Selected row ID:", rowSelected);
  
  //     if (!rowSelected) {
  //       message.error("Không tìm thấy ID người dùng cần xóa!");
  //       return;
  //     }
  
  //     // Gọi API xóa user
  //     const response = await UserService.deleteUser(rowSelected);
  
  //     // Kiểm tra phản hồi từ API
  //     console.log("API response:", response);
  
  //     if (response?.status === "OK") {
  //       message.success("Xóa người dùng thành công!");
  //       setIsModalOpenDelete(false); // Đóng modal
  //       queryUser.refetch(); // Làm mới danh sách user
  //     } else {
  //       message.error("Xóa người dùng thất bại!");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //     message.error("Đã xảy ra lỗi khi xóa người dùng!");
  //   }
  // };
  const handleDeleteUser = async () => {
    console.log("ID:", rowSelected); // Kiểm tra giá trị ID
    console.log("Token:", user?.accessToken); // Kiểm tra token
  
    // Kiểm tra trước khi gọi API
    if (!rowSelected || !user?.accessToken) {
      return message.error("Thiếu thông tin ID hoặc token, không thể xóa người dùng!");
    }
  
    try {
      const response = await UserService.deleteUser(rowSelected, user.accessToken);
  
      if (response?.status === "OK") {
        message.success("Xóa người dùng thành công!");
        setIsModalOpenDelete(false); // Đóng popup
        queryUser.refetch(); // Làm mới danh sách người dùng
      } else {
        message.error(response?.message || "Xóa người dùng thất bại!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Đã xảy ra lỗi khi xóa người dùng!");
    }
  };
  
  

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUser({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
      
    });
    form.resetFields();
  };

  // const onFinish = () => {
  //   mutation.mutate(stateUser, {
  //     onSettled: () => {
  //       queryUser.refetch();
  //     },
  //   });
  // };

  const handleOnchange = (e) => {
    setStateUser({
      ...stateUser
      ,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const fetchGetDetailsUser = async (rowSelected, accessToken) => {
    console.log("id thằng được chọn:",rowSelected);
    console.log("accesstoken của admin:",user?.accessToken);
        try {
      const res = await UserService.getDetailsUser(rowSelected,accessToken);
      if (res?.data) {
        setStateUserDetails({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          isAdmin: res.data.isAmin || "",
          
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
    
      fetchGetDetailsUser(rowSelected, user?.accessToken);
    }
  }, [rowSelected]);
  // console.log("stateProductDetails",stateProductDetails);
  const handleDetailsProduct = () => {
    
    if (rowSelected) {
      setIsLoadingUpdate(true);
   
      fetchGetDetailsUser(rowSelected, user?.accessToken); // Truyền rowSelected vào hàm
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

      setStateUser({
        ...stateUser,
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

      setStateUserDetails({
        ...stateUserDetails,
        image: preview, // Lưu base64 đã được nén
      });
    } catch (error) {
      console.error("Lỗi khi nén ảnh:", error);
    }
  };
  console.log("user", user);
  // const mutationUpdate = useMutationHook((data) => {
  //   const { id, token, ...rests } = data;
  //   const res = UserService.UpdateUser(id, { ...rests },token);
  //   console.log("Kết quả trả về từ API:", res);

  //   return res;
  // });
  const onUpdateUser = async () => {
    console.log("rowSelected:", rowSelected);
    console.log("stateUserDetails:", stateUserDetails);
    console.log("AccessToken:", user?.accessToken);
    console.log("Dữ liệu gửi vào mutationUpdate.mutate:");
    const res = await UserService.getDetailsUser(rowSelected,user?.accessToken);
    console.log("dữ liệu thằng cần sửa:", res);
    // const isAdmin = res?.data?.isAdmin;
    // console.log("IS ADMIN? :", isAdmin);



    console.log({
        id: rowSelected,
        ...stateUserDetails,
        token: user?.accessToken,
    });
    const dataToSend = {
      ...stateUserDetails,
      isAdmin: res?.data?.isAdmin, // Cung cấp giá trị mặc định nếu rỗng
    };
    mutationUpdate.mutate(
      {
        id: rowSelected,
        ...dataToSend,
        token: user?.accessToken,
      },
      {
        onMutate: async (updatedUser) => {
          // Tạm ngừng refetch trong React Query
          await queryUser.cancelQueries();
    
          // Lưu lại dữ liệu trước đó để khôi phục nếu xảy ra lỗi
          const previousUsers = queryUser.getQueryData();
    
          // Cập nhật ngay giao diện
          queryUser.setQueryData((old) =>
            old.map((user) =>
              user._id === updatedUser.id ? { ...user, ...dataToSend } : user
            )
          );
    
          return { previousUsers }; // Trả về để rollback khi cần
        },
        onError: (err, variables, context) => {
          // Khôi phục dữ liệu cũ nếu lỗi
          queryUser.setQueryData(context.previousUsers);
          message.error("Cập nhật thất bại!");
        },
        onSettled: () => {
          // Refetch lại để đồng bộ chính xác từ API
          queryUser.refetch();
        },
      }
    );
    
};


  return (
    <div>
      <WrapperHeader> Quản Lí Người Dùng </WrapperHeader>
      
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isLoading={isLoadingUsers}
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

      <DrawerComponent
        title="Chi tiết người dùng"
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
            onFinish={onUpdateUser}
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateUserDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <InputComponent
                value={stateUserDetails.email}
                onChange={handleOnchangeDetails}
                name="email"
              />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>

            {/* <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please input your image!" }]}
              KHI NÀO THÊM ĐƯỢC ẢNH NHỚ MỞ LẠI
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
            </Form.Item> */}

            <Form.Item label={null} wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent
        title="Xóa người dùng"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteUser}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa tài khoản này không</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminUser;