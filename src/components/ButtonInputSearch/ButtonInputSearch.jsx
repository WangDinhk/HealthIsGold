import { Button,Input, Layout } from 'antd';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';

const ButtonInputSearch = (props) => { 
    const {size, placeHolder, textButton, bordered, backgroundColorInput ='white',backgroundColorButton ='white'} = props;
    return (
       <div style={{display:'flex'}}>
            <Input 
                size={size} 
                style={{backgroundColor:backgroundColorInput}} 
                bordered ={bordered} 
                placeHolder={placeHolder} 
            />
            <Button 
                size={size} 
                style={{backgroundColor:backgroundColorButton}} 
                bordered ={bordered} 
                icon={<SearchOutlined style={{color: 'rgb(33, 103, 221)'}}/>}>{textButton}
            </Button>
       </div>
    );
} 

export default ButtonInputSearch