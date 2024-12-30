import { Upload } from "antd"
import styled from "styled-components"

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 20px;
    margin: 4px 0;
`

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #e8e8e8;
    width: 800px;
    margin: 0 auto;
    padding: 40px;
    border-radius: 16px;
    gap: 20px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.05);
`

export const WrapperLabel = styled.label`
    color: #333;
    font-size: 14px;
    font-weight: 500;
    width: 120px;
    text-align: left;
`

export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload-select {
        width: unset !important;
        height: unset !important;
    }
    & .ant-upload-list-item {
        display: none;
    }
`
