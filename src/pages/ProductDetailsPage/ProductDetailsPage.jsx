import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../service/ProductService';
import Loading from '../../components/LoadingComponent/Loading';
import { WrapperContainer, WrapperImageContainer, WrapperInfoContainer, ProductName, ProductPrice, ProductDetail } from './style';
import { Button } from 'antd';

const ProductDetailsPage = () => {
  const { id } = useParams();
  
  const { isLoading, data: productData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductService.getDetailsProduct(id),
  });

  return (
    <Loading isLoading={isLoading}>
      <WrapperContainer>
        {productData?.data && (
          <>
            <WrapperImageContainer>
              <img src={productData.data.image} alt={productData.data.name} />
            </WrapperImageContainer>
            
            <WrapperInfoContainer>
              <ProductName>{productData.data.name}</ProductName>
              <ProductPrice>
                <span className="current-price">
                  {(productData.data.price * (1 - productData.data.discount / 100)).toFixed(2)} đ
                </span>
                {productData.data.discount > 0 && (
                  <span className="original-price">{productData.data.price} đ</span>
                )}
                <span className="unit">/{productData.data.unit}</span>
              </ProductPrice>
              
              <ProductDetail>
                <h3>Thông tin sản phẩm</h3>
                <p><strong>Nhà sản xuất:</strong> {productData.data.manufacturer}</p>
                <p><strong>Xuất xứ:</strong> {productData.data.country}</p>
                <p><strong>Đối tượng sử dụng:</strong> {productData.data.target}</p>
                <p><strong>Thành phần:</strong> {productData.data.ingredient}</p>
                <p><strong>Mô tả:</strong> {productData.data.description}</p>
              </ProductDetail>

              <Button type="primary" size="large">
                Thêm vào giỏ hàng
              </Button>
            </WrapperInfoContainer>
          </>
        )}
      </WrapperContainer>
    </Loading>
  );
};

export default ProductDetailsPage;
