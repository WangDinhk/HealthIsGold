import styled from "styled-components";

export const WrapperContentAdmin = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;

  .site-statistic-demo-card {
    padding-bottom: 20px;
    
    .ant-card {
      border-radius: 8px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
      transition: all 0.3s;

      &:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transform: translateY(-2px);
      }
    }

    .ant-statistic-title {
      font-size: 16px;
      color: rgba(0,0,0,0.65);
    }

    .ant-statistic-content {
      font-size: 24px;
    }
  }
`;
