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
  font-size: 32px;
  margin-bottom: 24px;
  color: #111;
  font-weight: 600;
`;

export const ProductPrice = styled.div`
  margin-bottom: 32px;
  
  .current-price {
    font-size: 36px;
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
    margin-left: 12px;
    font-size: 2rem; 
    vertical-align: middle;
  }
`;

export const ProductDetail = styled.div`
  margin-bottom: 32px;
  
  h3 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #111;
    font-weight: 500;
  }
  
  p {
    font-size: 16px;
    margin-bottom: 16px;
    color: #444;
    
    strong {
      color: #222;
      min-width: 160px;
      display: inline-block;
    }
  }
`;

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;

  label {
    font-size: 16px;
    color: #222;
    min-width: 100px;
  }
`;

export const RelatedProducts = styled.div`
  margin: 40px auto;
  max-width: 1270px;
  padding: 0 15px;

  .related-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    
    h2 {
      font-size: 24px;
      margin: 0;
      margin-right: 10px;
    }

    span {
      color: #666;
      font-size: 1.3rem; // Increased from default
    }
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
`;
