import React, { useState, useRef, useCallback } from "react"; // Thêm useRef
import { Menu, Dropdown } from "antd";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../service/ProductService";
import CardComponent from "../CardComponent/CardComponent";
import {
  WrapperListDropdown,
  WrapperDropdown,
  WrapperButton,
  StyledDownOutlined,
  ItemImg,
  WrapperProductList,
  ProductOverlay, // Add this import
  MenuContainer,
} from "./style";

const NavBarComponent = () => {
  const [hoveredType, setHoveredType] = useState(null);
  const [showProducts, setShowProducts] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const dropdownRef = useRef(null);
  const menuItemRefs = useRef({});

  const { data: productsData } = useQuery({
    queryKey: ['products', hoveredType],
    queryFn: () => hoveredType ? ProductService.getProductsByType(hoveredType) : null,
    enabled: !!hoveredType,
    staleTime: 2 * 60 * 1000
  });

  const handleCloseProducts = () => {
    setHoveredType(null);
    setShowProducts(false);
  };

  const handleMenuEnter = useCallback((type) => (event) => { // Thêm event parameter và thay đổi cấu trúc function
    setHoveredType(type);
    setShowProducts(true);
  }, []);

  const createProductMenu = (items) => (
    <MenuContainer>
      <Menu 
        onMouseLeave={() => setShowProducts(false)}
        style={{ borderRight: '1px solid #f0f0f0' }}
      >
        {items}
      </Menu>
      {showProducts && hoveredType && (
        <WrapperProductList
          isVisible={showProducts}
          onMouseEnter={() => setShowProducts(true)}
          onMouseLeave={() => setShowProducts(false)}
        >
          {productsData?.data?.slice(0, 4).map((product) => (
            <div className="product-card" key={product._id}>
              <CardComponent {...product} />
            </div>
          ))}
        </WrapperProductList>
      )}
    </MenuContainer>
  );

  const createMenuItem = useCallback((key, type, icon, label) => (
    <Menu.Item
      key={key}
      ref={el => menuItemRefs.current[key] = el}
      onMouseEnter={handleMenuEnter(type)} // Không cần thay đổi ở đây vì handleMenuEnter đã return một function
    >
      <ItemImg src={icon} alt="" />
      {label}
    </Menu.Item>
  ), [handleMenuEnter]);

  const functionalFoodItems = createProductMenu(
    <>
      {createMenuItem(
        "vitamin",
        "Vitamin & Khoáng chất",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/80x80/https://cms-prod.s3-sgn09.fptcloud.com/smalls/tpcn_vitamin_khoang_chat_level_2_91b99b5a64.png",
        "Vitamin & Khoáng chất"
      )}
      {createMenuItem(
        "hormone",
        "Sinh lý - Nội tiết tố",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/sinh_li_noi_tiet_to_ec55ecdc29.png",
        "Sinh lý - Nội tiết tố"
      )}
      {createMenuItem(
        "function",
        "Cải thiện tăng cường chức năng",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/cai_thien_tang_cuong_chuc_nang_level_2_18502416c0.png",
        "Cải thiện tăng cường chức năng"
      )}
      {createMenuItem(
        "treatment-support",
        "Hỗ trợ điều trị",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/ho_tro_dieu_tri_level_2_00d86ca048.png",
        "Hỗ trợ điều trị"
      )}
      {createMenuItem(
        "digestive-support",
        "Hồ trợ tiêu hóa",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/ho_tro_tieu_hoa_level_2_df7385ed6e.png",
        "Hồ trợ tiêu hóa"
      )}
      {createMenuItem(
        "brain-support",
        "Thần kinh não",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png",
        "Thần kinh não"
      )}
      {createMenuItem(
        "beauty-support",
        "Hỗ trợ làm đẹp",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/ho_tro_lam_dep_level_2_87dfb56752.png",
        "Hỗ trợ làm đẹp"
      )}
      {createMenuItem(
        "heart-health",
        "Sức khỏe tim mạch",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/suc_khoe_tim_mach_level_2_1fc9d156fd.png",
        "Sức khỏe tim mạch"
      )}
      {createMenuItem(
        "nutrition",
        "Dinh dưỡng",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/dinh_duong_level_2_6b1af6b735.png",
        "Dinh dưỡng"
      )}
    </>
  );

  const cosmeticMedicineItems = createProductMenu(
    <>
      {createMenuItem(
        "facial-care",
        "Chăm sóc da mặt",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/cham_soc_da_mat_level_2_83d5e5f264.png",
        "Chăm sóc da mặt"
      )}
      {createMenuItem(
        "body-care",
        "Chăm sóc cơ thể",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/cham_soc_co_the_level_2_3498128f6b.png",
        "Chăm sóc cơ thể"
      )}
      {createMenuItem(
        "skin-solution",
        "Giải pháp làn da",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/giai_phap_lan_da_level_2_24c57abcd0.png",
        "Giải pháp làn da"
      )}
      {createMenuItem(
        "hair-care",
        "Chăm sóc tóc - da dầu",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/cham_soc_toc_da_dau_level_2_8ad8c93cf9.png",
        "Chăm sóc tóc - da dầu"
      )}
      {createMenuItem(
        "makeup",
        "Mỹ phẩm trang điểm",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/my_pham_trang_diem_level_2_f3eec172b2.png",
        "Mỹ phẩm trang điểm"
      )}
      {createMenuItem(
        "eye-care",
        "Chăm sóc da vùng mắt",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/cham_soc_da_vung_mat_level_2_a354c2cbf1.png",
        "Chăm sóc da vùng mắt"
      )}
      {createMenuItem(
        "natural-products",
        "Sản phẩm từ thiên nhiên",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/san_pham_tu_thien_nhien_level_2_be7122dfa2.png",
        "Sản phẩm từ thiên nhiên"
      )}
    </>
  );

  const personalCareItems = createProductMenu(
    <>
      {createMenuItem(
        "sexual-support",
        "Hỗ trợ tình dục",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/ho_tro_tinh_duc_level_2_d48129bdca.png",
        "Hỗ trợ tình dục"
      )}
      {createMenuItem(
        "food-drink",
        "Thực phẩm - Đồ uống",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/thuc_pham_do_uong_level_2_eb6bd25816.png",
        "Thực phẩm - Đồ uống"
      )}
      {createMenuItem(
        "personal-hygiene",
        "Vệ sinh cá nhân",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/ve_sinh_ca_nhan_level_2_e3eea1b065.png",
        "Vệ sinh cá nhân"
      )}
      {createMenuItem(
        "oral-care",
        "Chăm sóc răng miệng",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/cham_soc_rang_mieng_level_2_e8db475de8.png",
        "Chăm sóc răng miệng"
      )}
      {createMenuItem(
        "household-items",
        "Đồ dùng gia đình",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/do_dung_gia_dinh_level_2_782f681291.png",
        "Đồ dùng gia đình"
      )}
      {createMenuItem(
        "general-goods",
        "Hàng tổng hợp",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/hang_tong_hop_level_2_c302f72c95.png",
        "Hàng tổng hợp"
      )}
      {createMenuItem(
        "essential-oils",
        "Tinh dầu các loại",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/tinh_dau_cac_loai_level_2_73f496ca53.png",
        "Tinh dầu các loại"
      )}
      {createMenuItem(
        "beauty-devices",
        "Thiết bị làm đẹp",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/thiet_bi_lam_dep_level_2_2a5fd4372b.png",
        "Thiết bị làm đẹp"
      )}
    </>
  );

  const medicineItems = createProductMenu(
    <>
      {createMenuItem(
        "medicine-search",
        "Tra cứu thuốc",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Icon_tra_cuu_thuoc_6de870355e.png",
        "Tra cứu thuốc"
      )}
      {createMenuItem(
        "drug-search",
        "Tra cứu dược chất",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/icon_tra_cuu_duoc_lieu_e454df36e0.png",
        "Tra cứu dược chất"
      )}
      {createMenuItem(
        "herb-search",
        "Tra cứu dược liệu",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/icon_tra_cuu_duoc_chat_bdcb6acdde.png",
        "Tra cứu dược liệu"
      )}
    </>
  );

  const medicalEquipmentFoodItems = createProductMenu(
    <>
      {createMenuItem(
        "medical-tools",
        "Dụng cụ y tế",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/dung_cu_y_te_level_2_9b136905b5.png",
        "Dụng cụ y tế"
      )}
      {createMenuItem(
        "monitoring-tools",
        "Dụng cụ theo dõi",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/dung_cu_theo_doi_level_2_fac9d43d8f.png",
        "Dụng cụ theo dõi"
      )}
      {createMenuItem(
        "first-aid-tools",
        "Dụng cụ sơ cứu",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/dung_cu_so_cuu_level_2_8c6a7cfa0d.png",
        "Dụng cụ sơ cứu"
      )}
      {createMenuItem(
        "masks",
        "Khẩu trang",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/khau_trang_level_2_6f09dcca5c.png",
        "Khẩu trang"
      )}
    </>
  );

  const healthItems = createProductMenu(
    <>
      {createMenuItem(
        "cancer-page",
        "Chuyên trang ung thư",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/48x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/icon_Menu_c5fc94ebc9.png",
        "Chuyên trang ung thư"
      )}
      {createMenuItem(
        "health-page",
        "Chuyên trang bệnh & sức khỏe",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/48x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Chuyen_trang_9f4523a8b6.png",
        "Chuyên trang bệnh & sức khỏe"
      )}
      {createMenuItem(
        "promotion-news",
        "Tin khuyến mãi",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/48x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Tin_khuyen_mai_87bca39cdb.png",
        "Tin khuyến mãi"
      )}
      {createMenuItem(
        "media",
        "Truyền Thông",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/48x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Truyen_thong_3daad9cfc8.png",
        "Truyền Thông"
      )}
    </>
  );

  return (
    <div>
      <WrapperListDropdown>
        <Dropdown 
          overlay={functionalFoodItems}
          onVisibleChange={(visible) => !visible && setShowProducts(false)}
          placement="bottomLeft"
          trigger={['hover']}
        >
          <WrapperDropdown>
            <WrapperButton to="/">
              Thực phẩm chức năng <StyledDownOutlined />
            </WrapperButton>
          </WrapperDropdown>
        </Dropdown>
        <Dropdown 
          overlay={cosmeticMedicineItems}
          onVisibleChange={(visible) => !visible && setShowProducts(false)}
          placement="bottomLeft"
          trigger={['hover']}
        >
          <WrapperDropdown>
            <WrapperButton to="/">
              Dược mỹ phẩm <StyledDownOutlined />
            </WrapperButton>
          </WrapperDropdown>
        </Dropdown>
        <Dropdown 
          overlay={personalCareItems}
          onVisibleChange={(visible) => !visible && setShowProducts(false)}
          placement="bottomLeft"
          trigger={['hover']}
        >
          <WrapperDropdown>
            <WrapperButton to="/">
              Chăm sóc cá nhân <StyledDownOutlined />
            </WrapperButton>
          </WrapperDropdown>
        </Dropdown>
        <Dropdown 
          overlay={medicineItems}
          onVisibleChange={(visible) => !visible && setShowProducts(false)}
          placement="bottomLeft"
          trigger={['hover']}
        >
          <WrapperDropdown>
            <WrapperButton to="/">
              Thuốc <StyledDownOutlined />
            </WrapperButton>
          </WrapperDropdown>
        </Dropdown>
        <Dropdown 
          overlay={medicalEquipmentFoodItems}
          onVisibleChange={(visible) => !visible && setShowProducts(false)}
          placement="bottomLeft"
          trigger={['hover']}
        >
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
        <Dropdown 
          overlay={healthItems}
          onVisibleChange={(visible) => !visible && setShowProducts(false)}
          placement="bottomLeft"
          trigger={['hover']}
        >
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
