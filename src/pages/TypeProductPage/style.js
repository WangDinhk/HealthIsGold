import styled from 'styled-components'
import { Col } from 'antd'

export const WrapperNavBar = styled(Col)`
    background: #fff;
    border-radius: 5px;
    height : fit-content;
    background-color: #edf0f3;
`

export const WrapperProducts = styled(Col)`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    padding-left: 20px;
    
    & > div {
        flex: 0 0 calc(20% - 15px);
        max-width: calc(20% - 15px);
    }
`