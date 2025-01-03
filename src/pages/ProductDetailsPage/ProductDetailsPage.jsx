import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import * as ProductService from '../../service/ProductService';
import * as CartService from '../../service/CartService';
import { addToCartSuccess, setLoadingCart } from '../../redux/slides/cartSlide';
import Loading from '../../components/LoadingComponent/Loading';
import { 
  WrapperContainer, 
  WrapperImageContainer, 
  WrapperInfoContainer, 
  ProductName, 
  ProductPrice, 
  ProductDetail,
  QuantityWrapper,
  RelatedProducts
} from './style';
import { Button, InputNumber, message } from 'antd';
import CardComponent from '../../components/CardComponent/CardComponent';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  
  const { isLoading, data: productData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductService.getDetailsProduct(id),
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ['related-products', productData?.data?.type],
    enabled: !!productData?.data?.type,
    queryFn: () => ProductService.getProductsByType(productData?.data?.type),
  });

  const handleAddToCart = async () => {
    if (!user.id) {
      message.warning("Vui lòng đăng nhập để thêm vào giỏ hàng");
      return;
    }

    try {
      dispatch(setLoadingCart(true));
      const res = await CartService.addToCart(user.id, id, quantity);
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

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

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
                  {new Intl.NumberFormat('vi-VN', { 
                    style: 'currency', 
                    currency: 'VND' 
                  }).format(productData.data.price * (1 - productData.data.discount / 100))}
                </span>
                {productData.data.discount > 0 && (
                  <span className="original-price">
                    {new Intl.NumberFormat('vi-VN', { 
                      style: 'currency', 
                      currency: 'VND' 
                    }).format(productData.data.price)}
                  </span>
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

              <QuantityWrapper>
                <label>Số lượng:</label>
                <InputNumber 
                  min={1} 
                  max={productData.data.countInStock} 
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </QuantityWrapper>

              <Button 
                type="primary" 
                size="large"
                style={{ height: '48px', width: '200px', fontSize: '16px' }}
                onClick={handleAddToCart}
                disabled={productData.data.countInStock === 0}
              >
                {productData.data.countInStock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
              </Button>
            </WrapperInfoContainer>
          </>
        )}
      </WrapperContainer>

      {relatedProducts?.data && relatedProducts.data.length > 0 && (
        <RelatedProducts>
          <div className="related-header">
            <h2>Sản phẩm tương tự</h2>
            <span>({relatedProducts.data.length - 1} sản phẩm)</span>
          </div>
          <div className="products-grid">
            {relatedProducts.data
              .filter(product => product._id !== id)
              .map(product => (
                <CardComponent 
                  key={product._id} 
                  {...product}
                  style={{ width: '100%' }}
                />
              ))}
          </div>
        </RelatedProducts>
      )}
    </Loading>
  );
};

export default ProductDetailsPage;
