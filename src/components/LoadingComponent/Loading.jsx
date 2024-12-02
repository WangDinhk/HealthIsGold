import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import React from "react";
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  width: auto;
  height: 100%;
  position: relative;
  
  .loading-content {
    width: 100%;
    height: 100%;
  }

  .spin-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
`;

const Loading = ({ children, isLoading }) => {
  return (
    <LoadingWrapper>
      {isLoading && (
        <div className="spin-wrapper">
          <Spin size="large" />
        </div>
      )}
      <div className="loading-content">
        {children}
      </div>
    </LoadingWrapper>
  );
};

export default Loading;
