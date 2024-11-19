import React  from "react";
import {Input} from 'antd';
import { WrapperInputStyle } from "./style";
const InputForm = (props) => {
    const {placeholder='Nhập text', ...rests} = props;
    return (
       <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={props.handleOnchange}/>
    )
}
export default InputForm;