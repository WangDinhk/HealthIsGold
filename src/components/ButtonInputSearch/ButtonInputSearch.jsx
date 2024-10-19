import { Button } from 'antd';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => { 
    const {size, placeHolder,
        textButton,bordered, 
        backgroundColorInput ='white',
        backgroundColorButton ='white',
        colorButton ='rgb(33, 103, 221)'
    } = props;
    return (
       <div style={{display:'flex'}}>
            <InputComponent 
                size={size} 
                style={{backgroundColor:backgroundColorInput}} 
                bordered ={bordered} 
                placeHolder={placeHolder} 
            />
            <ButtonComponent 
                size={size} 
                styleButton={{backgroundColor:backgroundColorButton, border: !bordered && 'none'}} 
                icon={<SearchOutlined color = {colorButton} style={{color: 'rgb(33, 103, 221)'}}/>}
                textButton={textButton}
                styleTextButton={{color: colorButton}}
            />
       </div>
    );
} 

export default ButtonInputSearch