import React from "react";
import {
  SlideImageContainer,
  WrapperPanner,
  WrapperPannerContent,
  WrapperBody,
  WrapperCards,
  WrapperButtonMore,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.png";
import slider2 from "../../assets/images/slider2.png";
import slider3 from "../../assets/images/slider3.png";
import slider4 from "../../assets/images/slider4.png";
import slider5 from "../../assets/images/slider5.png";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../service/ProductService";

const HomePage = () => {
  const arr = [
    "Thực phẩm chức năng",
    "Dược mỹ phẩm",
    "Chăm sóc cá nhân",
    "Thuốc",
    "Thiết bị y tế",
    "Tiêm chủng",
    "Bệnh",
    "Góc sức khỏe",
    "Hệ thống nhà thuốc",
  ];

  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const { isLoading, data } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductAll,
  });
  console.log("data", data);

  return (
    <>
      <div>
        <SlideImageContainer>
          <SliderComponent
            arrImages={[slider1, slider2, slider3, slider4, slider5]}
          />
        </SlideImageContainer>
        <div
          style={{
            background: "#FBF3E9",
            position: "relative",
          }}
        >
          <div style={{ position: "relative" }}>
            <WrapperPanner
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/320x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/san_pham_ban_chay_website_320x41_3x_88c599649c.png"
              alt="sanphambanchay"
            />
            <WrapperPannerContent>Sản phẩm bán chạy</WrapperPannerContent>
          </div>

          <WrapperBody>
            <WrapperCards>
              {data?.data?.map((product) => {
                return (
                  <CardComponent
                    key={product._id}
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}

                    name={product.name}
                    price={product.price}
                    type={product.type}
                    manufacturer={product.manufacturer}

                    discount={product.discount}
                    unit={product.unit}
                    country={product.country}
                    target={product.target}
                    
                    quantity={product.quantity}
                    ingredient={product.ingredient}

                  />
                );
              })}
              <div
                style={{
                  width: "100%",
                  justifyContent: "center",
                  display: "flex",
                  marginBottom: "20px",
                }}
              >
                <WrapperButtonMore
                  textButton="Xem thêm"
                  type="outline"
                  styleButton={{
                    border: " 1px solid rgb(11,116,229)",
                    color: "rgb(11,116,229)",
                    width: "240px",
                    borderRadius: "5px",
                  }}
                  styleTextButton={{ fontWeight: 500 }}
                />
              </div>
            </WrapperCards>
          </WrapperBody>
        </div>
      </div>
    </>
  );
};

export default HomePage;
