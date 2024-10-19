import { Button } from "antd";
import React from "react";
const ButtonComponent = ({size, styleButton,styleTextButton,textButton, ...rests}) => {
    return (
            <Button 
                size={size} 
                style={styleButton} 
                {...rests}
                //icon={<SearchOutlined style={{color: 'rgb(33, 103, 221)'}}/>}
            >
                <span style={styleTextButton}>{textButton}</span>
            </Button>
    );

}

export default ButtonComponent;