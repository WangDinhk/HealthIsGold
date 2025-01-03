import styled from 'styled-components';

export const WrapperOrder = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const OrderInfo = styled.div`
  flex: 1;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  h2 {
    margin-bottom: 20px;
    color: #333;
  }
`;

export const CartItems = styled.div`
  flex: 2;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  h2 {
    margin-bottom: 20px;
    color: #333;
  }
`;

export const PaymentInfo = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;

  button {
    min-width: 200px;
  }
`;
