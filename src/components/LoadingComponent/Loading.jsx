import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import React from "react";

const Loading = ({children, isLoading}) => {
  return (
    <Flex align="center" gap="middle">
      <Spin spinning={isLoading} indicator={<LoadingOutlined spin />} size="large" >
        {children}
      </Spin>
    </Flex>
  );
};
export default Loading;
