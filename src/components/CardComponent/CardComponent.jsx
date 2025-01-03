import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import * as CartService from "../../service/CartService";
import { addToCartSuccess, setLoadingCart } from "../../redux/slides/cartSlide";
import { Card } from "antd";
import * as ProductService from "../../service/ProductService";
import {
  StyleNameProduct,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperCardStyle,
  WrapperOldPrice,
  WrapperBuyButton,
  WrapperQuantity,
  WrapperImageContainer,
} from "./style";
import { useQueryClient } from '@tanstack/react-query';

const CardComponent = (props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const {
    _id,
    name,
    image,
    type,
    price,
    discount,
    countInStock,
    unit,
    quantity,
  } = props;

  const handleCardClick = () => {
    navigate(`/product/${_id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!user.id) {
      message.warning("Vui lòng đăng nhập để thêm vào giỏ hàng");
      return;
    }

    try {
      dispatch(setLoadingCart(true));
      const res = await CartService.addToCart(user.id, _id, 1);
      if (res.status === "OK") {
        dispatch(addToCartSuccess(res.data));
        message.success("Thêm vào giỏ hàng thành công");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra");
    } finally {
      dispatch(setLoadingCart(false));
    }
  };

  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ['product', _id],
      queryFn: () => ProductService.prefetchProduct(_id),
      staleTime: 5 * 60 * 1000,
    });

    if (type) {
      queryClient.prefetchQuery({
        queryKey: ['related-products', type],
        queryFn: () => ProductService.prefetchProductsByType(type),
        staleTime: 5 * 60 * 1000,
      });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price);
  };

  const discountedPrice = price - (price * discount / 100);

  return (
    <WrapperCardStyle
      hoverable
      bordered={false}
      style={{ width: 200, cursor: 'pointer', position: 'relative' }}
      cover={
        <WrapperImageContainer>
          <img
            alt={name}
            src={image || "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00033041_vien_uong_bo_sung_vitamin_d3_k2_mk7_pharmekal_d3k2_60v_7485_63b7_large_ee46593def.jpg"}
            style={{ padding: "10px", height: "200px", objectFit: "contain" }}
          />
        </WrapperImageContainer>
      }
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
    >
      {discount > 0 && (
        <WrapperDiscountText>
          <span>-{discount}%</span>
        </WrapperDiscountText>
      )}

      <StyleNameProduct title={name}>{name}</StyleNameProduct>
      
      <WrapperPriceText>
        <span>{formatPrice(discountedPrice)}</span>
        {unit && <span style={{ fontWeight: "350" }}>/{unit}</span>}
      </WrapperPriceText>

      {discount > 0 && (
        <WrapperOldPrice>{formatPrice(price)}</WrapperOldPrice>
      )}

      {quantity && (
        <WrapperQuantity>Số lượng: {quantity}</WrapperQuantity>
      )}

      {countInStock === 0 ? (
        <WrapperBuyButton type="primary" disabled>
          Hết hàng
        </WrapperBuyButton>
      ) : (
        <WrapperBuyButton type="primary" onClick={handleAddToCart}>
          Thêm vào giỏ
        </WrapperBuyButton>
      )}
    </WrapperCardStyle>
  );
};

export default CardComponent;
