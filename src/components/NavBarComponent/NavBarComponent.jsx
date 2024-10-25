import React from "react";
import { Menu, Dropdown } from "antd";
import {
  WrapperListDropdown,
  WrapperDropdown,
  WrapperButton,
  StyledDownOutlined,
  ItemImg,
} from "./style";

const NavBarComponent = () => {
  // Danh sách các mục trong dropdown
  const functionalFoodItems = (
    <Menu>
      <Menu.Item key="1">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/80x80/https://cms-prod.s3-sgn09.fptcloud.com/smalls/tpcn_vitamin_khoang_chat_level_2_91b99b5a64.png"
          alt=""
        />
        <span>Vitamin & Khoáng chất</span>
      </Menu.Item>
      <Menu.Item key="2">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/sinh_li_noi_tiet_to_ec55ecdc29.png"
          alt=""
        />
        Sinh lý - Nội tiết tố
      </Menu.Item>
      <Menu.Item key="3">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/cai_thien_tang_cuong_chuc_nang_level_2_18502416c0.png"
          alt=""
        />
        Cải thiện tăng cường chức năng
      </Menu.Item>
      <Menu.Item key="4">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/ho_tro_dieu_tri_level_2_00d86ca048.png"
          alt=""
        />
        Hỗ trợ điều trị
      </Menu.Item>
      <Menu.Item key="5">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/ho_tro_tieu_hoa_level_2_df7385ed6e.png"
          alt=""
        />
        Hồ trợ tiêu hóa
      </Menu.Item>
      <Menu.Item key="6">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png"
          alt=""
        />
        Thần kinh não
      </Menu.Item>
      <Menu.Item key="7">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/ho_tro_lam_dep_level_2_87dfb56752.png"
          alt=""
        />
        Hỗ trợ làm đẹp
      </Menu.Item>
      <Menu.Item key="8">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/suc_khoe_tim_mach_level_2_1fc9d156fd.png"
          alt=""
        />
        Sức khỏe tim mạch
      </Menu.Item>
      <Menu.Item key="9">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/dinh_duong_level_2_6b1af6b735.png"
          alt=""
        />
        Dinh dưỡng
      </Menu.Item>
    </Menu>
  );
  const cosmeticMedicineItems = (
    <Menu>
      <Menu.Item key="1">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/cham_soc_da_mat_level_2_83d5e5f264.png"
          alt=""
        />
        Chăm sóc da mặt
      </Menu.Item>
      <Menu.Item key="2">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/cham_soc_co_the_level_2_3498128f6b.png"
          alt=""
        />
        Chăm sóc cơ thể
      </Menu.Item>
      <Menu.Item key="3">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/giai_phap_lan_da_level_2_24c57abcd0.png"
          alt=""
        />
        Giải pháp làn da
      </Menu.Item>
      <Menu.Item key="4">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/cham_soc_toc_da_dau_level_2_8ad8c93cf9.png"
          alt=""
        />
        Chăm sóc tóc - da dầu
      </Menu.Item>
      <Menu.Item key="5">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/my_pham_trang_diem_level_2_f3eec172b2.png"
          alt=""
        />
        Mỹ phẩm trang điểm
      </Menu.Item>
      <Menu.Item key="6">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/cham_soc_da_vung_mat_level_2_a354c2cbf1.png"
          alt=""
        />
        Chăm sóc da vùng mắt
      </Menu.Item>
      <Menu.Item key="7">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/san_pham_tu_thien_nhien_level_2_be7122dfa2.png"
          alt=""
        />
        Sản phẩm từ thiên nhiên
      </Menu.Item>
    </Menu>
  );
  const personalCareItems = (
    <Menu>
      <Menu.Item key="1">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/ho_tro_tinh_duc_level_2_d48129bdca.png"
          alt=""
        />
        Hỗ trợ tình dục
      </Menu.Item>
      <Menu.Item key="2">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/thuc_pham_do_uong_level_2_eb6bd25816.png"
          alt=""
        />
        Thực phẩm - Đồ uống
      </Menu.Item>
      <Menu.Item key="3">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/ve_sinh_ca_nhan_level_2_e3eea1b065.png"
          alt=""
        />
        Vệ sinh cá nhân
      </Menu.Item>
      <Menu.Item key="4">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/cham_soc_rang_mieng_level_2_e8db475de8.png"
          alt=""
        />
        Chăm sóc răng miệng
      </Menu.Item>
      <Menu.Item key="5">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/do_dung_gia_dinh_level_2_782f681291.png"
          alt=""
        />
        Đồ dùng gia đình
      </Menu.Item>
      <Menu.Item key="6">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/hang_tong_hop_level_2_c302f72c95.png"
          alt=""
        />
        Hàng tổng hợp
      </Menu.Item>
      <Menu.Item key="7">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/tinh_dau_cac_loai_level_2_73f496ca53.png"
          alt=""
        />
        Tinh dầu các loại
      </Menu.Item>
      <Menu.Item key="8">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/thiet_bi_lam_dep_level_2_2a5fd4372b.png"
          alt=""
        />
        Thiết bị làm đẹp
      </Menu.Item>
    </Menu>
  );
  const medicineItems = (
    <Menu>
      <Menu.Item key="1">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Icon_tra_cuu_thuoc_6de870355e.png"
          alt=""
        />
        Tra cứu thuốc
      </Menu.Item>
      <Menu.Item key="2">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/icon_tra_cuu_duoc_lieu_e454df36e0.png"
          alt=""
        />
        Tra cứu dược chất
      </Menu.Item>
      <Menu.Item key="3">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/icon_tra_cuu_duoc_chat_bdcb6acdde.png"
          alt=""
        />
        Tra cứu dược liệu
      </Menu.Item>
    </Menu>
  );
  const medicalEquipmentFoodItems = (
    <Menu>
      <Menu.Item key="1">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/dung_cu_y_te_level_2_9b136905b5.png"
          alt=""
        />
        Dụng cụ y tế
      </Menu.Item>
      <Menu.Item key="2">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/dung_cu_theo_doi_level_2_fac9d43d8f.png"
          alt=""
        />
        Dụng cụ theo dõi
      </Menu.Item>
      <Menu.Item key="3">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/dung_cu_so_cuu_level_2_8c6a7cfa0d.png"
          alt=""
        />
        Dụng cụ sơ cứu
      </Menu.Item>
      <Menu.Item key="4">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/khau_trang_level_2_6f09dcca5c.png"
          alt=""
        />
        Khẩu trang
      </Menu.Item>
    </Menu>
  );
  const healthItems = (
    <Menu>
      <Menu.Item key="1">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/48x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/icon_Menu_c5fc94ebc9.png"
          alt=""
        />
        Chuyên trang ung thư
      </Menu.Item>
      <Menu.Item key="2">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/48x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Chuyen_trang_9f4523a8b6.png"
          alt=""
        />
        Chuyên trang bệnh & sức khỏe
      </Menu.Item>
      <Menu.Item key="3">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/48x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Tin_khuyen_mai_87bca39cdb.png"
          alt=""
        />
        Tin khuyến mãi
      </Menu.Item>
      <Menu.Item key="4">
        <ItemImg
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/48x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Truyen_thong_3daad9cfc8.png"
          alt=""
        />
        Truyền Thông
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{}}>
      <WrapperListDropdown>
        {/* Sử dụng Dropdown với menu */}
        <Dropdown overlay={functionalFoodItems}>
          {/* WrapperButton để hiển thị dropdown */}
          <WrapperDropdown>
            <WrapperButton to="/">
              Thực phẩm chức năng <StyledDownOutlined />
            </WrapperButton>
          </WrapperDropdown>
        </Dropdown>
        <Dropdown overlay={cosmeticMedicineItems}>
          {/* WrapperButton để hiển thị dropdown */}
          <WrapperDropdown>
            <WrapperButton to="/">
              Dược mỹ phẩm <StyledDownOutlined />
            </WrapperButton>
          </WrapperDropdown>
        </Dropdown>{" "}
        <Dropdown overlay={personalCareItems}>
          {/* WrapperButton để hiển thị dropdown */}
          <WrapperDropdown>
            <WrapperButton to="/">
              Chăm sóc cá nhân <StyledDownOutlined />
            </WrapperButton>
          </WrapperDropdown>
        </Dropdown>{" "}
        <Dropdown overlay={medicineItems}>
          {/* WrapperButton để hiển thị dropdown */}
          <WrapperDropdown>
            <WrapperButton to="/">
              Thuốc <StyledDownOutlined />
            </WrapperButton>
          </WrapperDropdown>
        </Dropdown>
        <Dropdown overlay={medicalEquipmentFoodItems}>
          {/* WrapperButton để hiển thị dropdown */}
          <WrapperDropdown>
            <WrapperButton to="/">
              Thiết bị y tế <StyledDownOutlined />
            </WrapperButton>
          </WrapperDropdown>
        </Dropdown>
        <WrapperDropdown>
          <WrapperButton to="/">Tiêm chủng</WrapperButton>
        </WrapperDropdown>
        <WrapperDropdown>
          <WrapperButton to="/">Bệnh</WrapperButton>
        </WrapperDropdown>
        <Dropdown overlay={healthItems}>
          {/* WrapperButton để hiển thị dropdown */}
          <WrapperDropdown>
            <WrapperButton to="/">
              Góc sức khỏe <StyledDownOutlined />
            </WrapperButton>
          </WrapperDropdown>
        </Dropdown>
        <WrapperDropdown>
          <WrapperButton to="/">Hệ thống nhà thuốc</WrapperButton>
        </WrapperDropdown>
      </WrapperListDropdown>
    </div>
  );
};

export default NavBarComponent;
