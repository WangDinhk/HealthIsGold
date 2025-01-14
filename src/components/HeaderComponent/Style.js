import { Row } from "antd";
import styled from "styled-components";



export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  // background: linear-gradient(to top, rgb(33, 103, 221), #5386E4);
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
  height: 120px;
`;

export const WrapperHeaderText = styled.div`
  color: white;
  justify-content: left;
  font-size: 24px;
  font-weight: bold;
  margin: 10px;
`;
export const WrapperHeaderAccount = styled.div`

  display: flex;
  padding-top: 15px;
  align-items: center;

  justify-content: left;
  align-items: center;
  color: white;
  font-size: 13px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  text-align: left;
  margin: 5px;
  gap: 10px;
`;

export const WrapperHeaderSmall = styled.span`
  font-size: 12px;
  color: white;
  white-space: nowrap;
`;
export const WrapperContentPopup = styled.p`
  cursor: pointer;
  margin:0px;
  display: flex;
  gap: 7px;
  padding:10px;
  &:hover {
    background-color: #EBEFF9;
    
    color:rgb(33 103 221);
  }
`;
