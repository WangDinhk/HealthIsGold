import React from "react";
import { CSSProperties } from "react";
import { BorderBottomOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Collapse, Checkbox, CollapseProps, theme, Flex, Radio } from "antd";

import {
  WrapperHead,
  WrapperBody,
  WrapperNavBar,
  RadioButton,
  CheckboxGroup,
  CheckboxItems,
  LabelStyled,
} from "./style";

const text = `...`;

const getItems = (panelStyle, onChange) => [
  {
    key: "sub1",
    label: <LabelStyled>Đối tượng sử dụng</LabelStyled>,
    children: (
      <CheckboxGroup style={{ width: "100%" }} onChange={onChange}>
        <CheckboxItems value="Tre_em">Trẻ em</CheckboxItems>
        <CheckboxItems value="Phu_nu_co_thai">Phụ nữ có thai</CheckboxItems>
        <CheckboxItems value="Nguoi_truong_thanh">
          Người trưởng thành
        </CheckboxItems>
      </CheckboxGroup>
    ),
  },

  {
    key: "sub2",
    label: <LabelStyled>Thương hiệu</LabelStyled>,
    children: (
      <CheckboxGroup style={{ width: "100%" }} onChange={onChange}>
        <CheckboxItems value="Vitabiotics">Vitabiotics</CheckboxItems>
        <CheckboxItems value="Brauer">Brauer</CheckboxItems>
        <CheckboxItems value="DHC">DHC</CheckboxItems>
      </CheckboxGroup>
    ),
  },
  {
    key: "sub3",
    label: <LabelStyled>Xuất xứ thương hiệu</LabelStyled>,
    children: (
      <CheckboxGroup style={{ width: "100%" }} onChange={onChange}>
        <CheckboxItems value="VietNam">Việt Nam</CheckboxItems>
        <CheckboxItems value="USA">Hoa Kỳ</CheckboxItems>
        <CheckboxItems value="Australia">Úc</CheckboxItems>
      </CheckboxGroup>
    ),
  },
  {
    key: "sub4",
    label: <LabelStyled>Giá bán</LabelStyled>,
    children: (
      <Flex vertical gap="middle">
        <Radio.Group
          size="large"
          style={{ display: "flex", flexDirection: "column", padding: "0" }}
        >
          <RadioButton value="100">Dưới 100.000đ</RadioButton>
          <RadioButton value="100-300">100.00đ đến 300.000đ</RadioButton>
          <RadioButton value="300-500">300.000đ đến 500.000đ</RadioButton>
          <RadioButton value="500">Trên 500.000đ</RadioButton>
        </Radio.Group>
      </Flex>
    ),
    style: panelStyle,
  },
];

const NavBarComponentLeft = () => {
  const { token } = theme.useToken();

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
    background: "#FFF", //////CHỖ LỎ ĐÂY
    marginBottom: "0",
  };

  const onChange = (checkedValues: any) => {
    console.log("Checked values:", checkedValues);
  };

  return (
    <WrapperNavBar>
      <WrapperHead>
        <svg
          width="24"
          height="24"
          className="mr-1 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 16H14C14.5523 16 15 16.4477 15 17C15 17.5128 14.614 17.9355 14.1166 17.9933L14 18H10C9.44772 18 9 17.5523 9 17C9 16.4872 9.38604 16.0645 9.88338 16.0067L10 16H14H10ZM8 11H16C16.5523 11 17 11.4477 17 12C17 12.5128 16.614 12.9355 16.1166 12.9933L16 13H8C7.44772 13 7 12.5523 7 12C7 11.4872 7.38604 11.0645 7.88338 11.0067L8 11H16H8ZM5 6H19C19.5523 6 20 6.44772 20 7C20 7.51284 19.614 7.93551 19.1166 7.99327L19 8H5C4.44772 8 4 7.55228 4 7C4 6.48716 4.38604 6.06449 4.88338 6.00673L5 6H19H5Z"
            fill="currentColor"
          />
        </svg>
        <div style={{ marginLeft: "5px" }}>Bộ lọc nâng cao</div>
      </WrapperHead>
      <WrapperBody>
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContain, backgroundColor: "#fff" }}
          items={getItems(panelStyle, onChange)}
        />
      </WrapperBody>
    </WrapperNavBar>
  );
};

export default NavBarComponentLeft;
