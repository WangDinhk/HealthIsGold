import { Input } from "antd";
import React from "react"
const InputComponent = ({size, placeHolder,style, bordered , ...rests }) => {
    return (
            <Input 
                size={size} 
                style={style} 
                bordered ={bordered} 
                placeHolder={placeHolder} 
                {...rests}
            />
    );

}
export default InputComponent;