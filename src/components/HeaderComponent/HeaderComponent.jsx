import React from 'react';
import { WrapperHeader, WrapperHeaderAccount, WrapperHeaderText } from './Style';
import { Button, Col } from 'antd';
import { UserOutlined,CaretDownOutlined,ShoppingCartOutlined  } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader gutter={16}>
                <Col span={5}>
                    <WrapperHeaderText>HEALTH IS GOLD</WrapperHeaderText>
                </Col>
                <Col span={12}>
                    <ButtonInputSearch 
                        size="large"
                        textButton="Search"
                        placeHolder = "Input search text" 
                    />
                
                    
                </Col>
                <Col span={7} style ={{display:'flex', gap:'20px'}}>
                
                    <WrapperHeaderAccount>
                        <UserOutlined style={{fontSize: '30px'}}/>
                        <div>
                            <span>Đăng nhập</span>
                            <div>
                                <span>Tài khoản</span>
                                <CaretDownOutlined />
                            </div>
                        </div>
                    </WrapperHeaderAccount>
                    <WrapperHeaderAccount>
                        <ShoppingCartOutlined style={{fontSize: '30px'}} />
                        <span>Giỏ hàng</span>
                    </WrapperHeaderAccount>
                
                </Col>
            </WrapperHeader>
        </div>
    );
}

export default HeaderComponent;
