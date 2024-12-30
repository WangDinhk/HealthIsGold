import styled from 'styled-components';

export const WrapperContainer = styled.div`
  display: flex;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  gap: 40px;
`;

export const WrapperImageContainer = styled.div`
  width: 40%;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const WrapperInfoContainer = styled.div`
  width: 60%;
`;

export const ProductName = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

export const ProductPrice = styled.div`
  margin-bottom: 24px;
  
  .current-price {
    font-size: 28px;
    color: #ee4d2d;
    font-weight: bold;
  }
  
  .original-price {
    font-size: 16px;
    color: #999;
    text-decoration: line-through;
    margin-left: 12px;
  }
  
  .unit {
    color: #666;
    margin-left: 8px;
  }
`;

export const ProductDetail = styled.div`
  margin-bottom: 24px;
  
  h3 {
    font-size: 18px;
    margin-bottom: 16px;
    color: #333;
  }
  
  p {
    margin-bottom: 12px;
    color: #666;
    
    strong {
      color: #333;
    }
  }
`;
