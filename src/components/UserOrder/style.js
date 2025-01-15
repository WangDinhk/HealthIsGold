import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.div`
    color : #000;
    font-size : 16px;
`
export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%
    }
    & .ant-upload-list-item-info {
        display: none
    }
    & .ant-upload-list-item{
        display:none !important;   
    }
`

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
