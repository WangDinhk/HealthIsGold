import {
  Row,
  Col,
  Image,
  Carousel,
  Modal,
  InputNumber,
  Button,
  Flex,
} from "antd";
import React, { useState } from "react";
import type { InputNumberProps } from "antd";

import {
  WrapperImg,
  WrapperNameProduct,
  WrapperBrandProduct,
  WrapperNameBrandProd,
  WrapperDescription,
  WrapperRate_ID,
  WrapperRate,
  WrapperID,
  WrapperPriceText,
  WrapperOldPrice,
  WrapperQuantity,
} from "./style";
import { LeftOutlined, RightOutlined, StarFilled } from "@ant-design/icons";
import { WrapperLink } from "../../pages/ProductsPage/style";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

const onChange: InputNumberProps["onChange"] = (value) => {
  console.log("changed", value);
};

//WrapperImg DESIGN
const images = [
  "https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00501597_vien_uong_tang_cuong_sinh_ly_ironmen_ocavill_60v_5022_6302_large_3cb863cf94.jpg",
  "https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09804_846f39b5e4.jpg",
  "https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09804_846f39b5e4.jpg",

  "https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09804_846f39b5e4.jpg",
  "https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09804_846f39b5e4.jpg",
  "https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09804_846f39b5e4.jpg",
];

const CustomNextArrow = ({ currentSlide, onClick }) => {
  return currentSlide < images.length - 1 ? (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        width: "40px",
        height: "40px",
        background: "rgba(0, 0, 0, 0.8)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 2,
      }}
    >
      <RightOutlined style={{ fontSize: "20px", color: "white" }} />
    </div>
  ) : null;
};

const CustomPrevArrow = ({ currentSlide, onClick }) => {
  return currentSlide > 0 ? (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        width: "40px",
        height: "40px",
        background: "rgba(0, 0, 0, 0.8)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 2,
      }}
    >
      <LeftOutlined style={{ fontSize: "20px", color: "white" }} />
    </div>
  ) : null;
};

const ProductDetailsComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalCurrentSlide, setModalCurrentSlide] = useState(0);

  const carouselSettings = {
    dots: false,
    arrows: true,
    nextArrow: <CustomNextArrow currentSlide={currentSlide} />,
    prevArrow: <CustomPrevArrow currentSlide={currentSlide} />,
  };

  const handleThumbnailClick = (index) => {
    if (index < images.length) {
      setCurrentSlide(index);
    }
  };

  const handleShowAllClick = () => {
    setIsModalVisible(true);
    setModalCurrentSlide(0);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <Row >
      <WrapperImg span={10}>
        <div style={{position:"sticky",top:"0"}}>
          {/* Main Carousel */}
          <Carousel
            {...carouselSettings}
            afterChange={(current) => setCurrentSlide(current)}
            ref={(carousel) => {
              if (carousel) carousel.goTo(currentSlide);
            }}
          >
            {images.map((src, index) => (
              <div key={index}>
                <Image src={src} alt={`Slide ${index + 1}`} preview={false} />
              </div>
            ))}
          </Carousel>

          {/* Thumbnails */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            {images.slice(0, 3).map((src, index) => (
              <div
                key={index}
                style={{
                  cursor: "pointer",
                  border:
                    currentSlide === index
                      ? "2px solid #1890ff"
                      : "2px solid transparent",
                  margin: "0 5px",
                }}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  width={50}
                  git
                  status
                  git
                  status
                  height={50}
                  preview={false}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
            {images.length > 4 && (
              <div
                style={{
                  cursor: "pointer",
                  border: "2px solid transparent",
                  margin: "0 5px",
                  position: "relative",
                }}
                onClick={handleShowAllClick}
              >
                <Image
                  src={images[3]}
                  alt="Xem thêm"
                  width={50}
                  height={50}
                  style={{ objectFit: "cover", opacity: 0.6 }}
                  preview={false}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.4)",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    +{images.length - 4}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Modal Gallery */}
          <Modal
            visible={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
            width={800}
            centered
          >
            <div style={{ padding: "20px" }}>
              <Carousel
                {...carouselSettings}
                initialSlide={modalCurrentSlide}
                afterChange={(current) => setModalCurrentSlide(current)}
              >
                {images.map((src, index) => (
                  <div key={index} style={{ textAlign: "center" }}>
                    <Image
                      src={src}
                      alt={`Slide ${index + 1}`}
                      style={{ maxHeight: "600px", objectFit: "contain" }}
                      preview={false}
                    />
                  </div>
                ))}
              </Carousel>

              {/* Modal Thumbnails */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {images.map((src, index) => (
                  <div
                    key={index}
                    style={{
                      cursor: "pointer",
                      border:
                        modalCurrentSlide === index
                          ? "2px solid #1890ff"
                          : "2px solid transparent",
                    }}
                    onClick={() => setModalCurrentSlide(index)}
                  >
                    <Image
                      src={src}
                      alt={`Thumbnail ${index + 1}`}
                      width={60}
                      height={60}
                      preview={false}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        </div>
      </WrapperImg>
      {/* WrapperImg DESIGN */}
      {/* CHI TIẾT THUỐC */}
      <WrapperDescription span={14}>
        <WrapperBrandProduct>
          <span>Thương hiệu:</span>
          <WrapperNameBrandProd>OCAVILL</WrapperNameBrandProd>
        </WrapperBrandProduct>
        <WrapperNameProduct>
          Viên uống Ironmen Ocavill hỗ trợ tăng cường sinh lý nam giới (60 viên)
        </WrapperNameProduct>
        <WrapperRate_ID>
          <WrapperRate>00501597</WrapperRate>
          <span
            style={{
              background: "#ABB2BD",
              margin: "0 5px",
              display: "inline-block",
              width: "4px",
              height: "4px",
              borderRadius: "50px",
            }}
          ></span>

          <WrapperID>4.9</WrapperID>
          <StarFilled
            style={{ color: "#DC983A", marginLeft: "5px", fontSize: "17px" }}
          />
        </WrapperRate_ID>
        <WrapperPriceText>
          <span>500.000đ</span>
          <span style={{ fontWeight: "350" }}>/Hộp</span>
        </WrapperPriceText>
        <WrapperOldPrice>7000.000đ</WrapperOldPrice>
        <table>
          <tbody style={{ fontSize: "17px" }}>
            <tr
              style={{
                lineHeight: "20px",
              }}
            >
              <td
                style={{
                  width: "25%",
                  color: "#4B4F61",
                  paddingBottom: "20px",
                }}
              >
                Danh mục
              </td>
              <td style={{ width: "75%", paddingBottom: "20px" }}>
                <WrapperLink href="">Đường dẫn3</WrapperLink>
              </td>
            </tr>
            <tr style={{ lineHeight: "20px" }}>
              <td
                style={{
                  width: "25%",
                  color: "#4B4F61",
                  paddingBottom: "20px",
                }}
              >
                Nhà sản xuất
              </td>
              <td style={{ width: "75%", paddingBottom: "20px" }}>
                PHYTOPHARMA LTD
              </td>
            </tr>
            <tr style={{ lineHeight: "20px" }}>
              <td
                style={{
                  width: "25%",
                  color: "#4B4F61",
                  paddingBottom: "20px",
                }}
              >
                Nước sản xuất
              </td>
              <td style={{ width: "75%", paddingBottom: "20px" }}>Bulgaria</td>
            </tr>
             <tr style={{ lineHeight: "20px" }}>
              <td
                style={{
                  width: "25%",
                  color: "#4B4F61",
                  paddingBottom: "20px",
                }}
              >
Đối tượng sử dụng              </td>
              <td style={{ width: "75%", paddingBottom: "20px" }}>Người trưởng thành</td>
            </tr>
            
            <tr
              style={{
                verticalAlign: "top",
                lineHeight: "22px",
              }}
            >
              <td
                style={{
                  width: "25%",
                  color: "#4B4F61",
                  paddingBottom: "20px",
                }}
              >
                Thành phần
              </td>
              <td style={{ width: "75%", paddingBottom: "20px" }}>
                Chiết xuất bạch tật lê, Maca Root, L–arginine, Selen, Kẽm, Nhân
                Sâm, Coenzyme Q10, Tongkat ali extract liquid.
              </td>
            </tr>
            <tr style={{ verticalAlign: "top", lineHeight: "22px" }}>
              <td
                style={{
                  width: "25%",
                  color: "#4B4F61",
                  paddingBottom: "20px",
                }}
              >
                Mô tả ngắn
              </td>
              <td style={{ width: "75%", paddingBottom: "20px" }}>
                Ironmen là thực phẩm bảo vệ sức khỏe giúp tăng cường sinh lý nam
                nhờ sự kết hợp giữa các thảo dược. Cung cấp năng lượng, bồi bổ
                sinh lực hiệu quả.
              </td>
            </tr>
          </tbody>
        </table>
<WrapperQuantity>
          <span style={{ color: "#4b4f61" }}>Chọn số lượng</span>
          <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
        </WrapperQuantity>

        <Button
          type="primary"
          style={{
            width: "300px",
            height: "58px",
            borderRadius: "45px",
            fontSize: "23px",
            background: "#2C55D6",
          }}
        >
          Chọn mua
        </Button>
      </WrapperDescription>
      {/* END CHI TIẾT THUỐC */}
    </Row>
  );
};

export default ProductDetailsComponent;
