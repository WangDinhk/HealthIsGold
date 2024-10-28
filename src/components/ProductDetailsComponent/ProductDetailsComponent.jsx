import { Row, Col, Image, Carousel, Modal } from "antd";
import React, { useState } from "react";
import { WrapperImg } from "./style";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const images = [
  "https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00501597_vien_uong_tang_cuong_sinh_ly_ironmen_ocavill_60v_5022_6302_large_3cb863cf94.jpg",
  "https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09804_846f39b5e4.jpg",
  "https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09804_846f39b5e4.jpg",
  "https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09804_846f39b5e4.jpg",

  "https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09804_846f39b5e4.jpg",
];

// ///////////////////MAINNNNNNN
// Custom navigation buttons
const CustomNextArrow = (props) => (
  <div
    onClick={props.onClick}
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
);

const CustomPrevArrow = (props) => (
  <div
    onClick={props.onClick}
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
);

const ProductDetailsComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalCurrentSlide, setModalCurrentSlide] = useState(0);

  const carouselSettings = {
    dots: false,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
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
    <div>
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
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
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
  );
};

export default ProductDetailsComponent;
// /////////////////MAIN
