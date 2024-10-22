import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgb(33 103 221);
    align-items: center;
    gap : 16px;
    flex-wrap: nowrap;
 `   
export const WrapperHeaderText = styled.div`
    color: white;
    justify-content: left; 
    font-size: 20px;
    font-weight: bold;
    margin: 10px;
            
`
export const WrapperHeaderAccount = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    color: white;
    font-size: 13px;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    text-align: left;   
    margin: 5px; 
    gap: 10px;       
`

export const WrapperHeaderSmall = styled.span`
    font-size: 12px;
    color: white;
    white-space: nowrap;
`
