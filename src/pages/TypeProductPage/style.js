import styled from 'styled-components'
import { Col } from 'antd'

export const WrapperNavBar = styled(Col)`
    background: #fff;
    border-radius: 5px;
    height: fit-content;
    background-color: #edf0f3;
    padding: 16px;
    margin-right: 16px;
`

export const WrapperProducts = styled(Col)`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 16px;
`