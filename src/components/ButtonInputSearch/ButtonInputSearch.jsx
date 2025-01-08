import { Button } from 'antd';
import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';

const ButtonInputSearch = (props) => { 
    const { 
        size, 
        placeHolder,
        textButton,
        bordered, 
        backgroundColorInput ='white',
        backgroundColorButton ='white',
        colorButton ='rgb(33, 103, 221)',
        initialValue = '',
        onSearch
    } = props;

    const [searchValue, setSearchValue] = useState(initialValue);
    const navigate = useNavigate();

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchValue);
        } else {
            navigate(`/search?keyword=${encodeURIComponent(searchValue)}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
       <div style={{display:'flex'}}>
            <InputComponent 
                size={size} 
                style={{backgroundColor:backgroundColorInput}} 
                bordered={bordered} 
                placeholder={placeHolder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <ButtonComponent 
                size={size} 
                styleButton={{backgroundColor:backgroundColorButton, border: !bordered && 'none'}} 
                icon={<SearchOutlined color={colorButton} style={{color: 'rgb(33, 103, 221)'}}/>}
                textButton={textButton}
                styleTextButton={{color: colorButton}}
                onClick={handleSearch}
            />
       </div>
    );
} 

export default ButtonInputSearch;