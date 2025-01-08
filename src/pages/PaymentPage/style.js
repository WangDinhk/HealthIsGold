import styled from "styled-components";

export const WrapperContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin : 50px 50px;
    h2 {
        font-size: 25px;
        font-weight: 700;
    }
    p {
        padding : 0 10px;
        text-align: center;
        font-size: 15px;
        font-weight: 400;
    }
    input {
        width: 100%;
        height: 40px;
        border-radius: 3px;
        padding: 0 20px;
        margin: 20px 0;
    } 
`

export const WrapperTextLight = styled.span`
    color : rgb(13,92,182);
    font-size: 15px;
    cursor: pointer;
`

export const WrapperLabel = styled.label`
    color: #333;
    font-size: 14px;
    font-weight: 500;
    width: 120px;
    text-align: left;
`