import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperTypeProduct } from './style';

const HomePage = () => {
    const arr = ["Thực phẩm chức năng","Dược mỹ phẩm","Chăm sóc cá nhân","Thuốc","Thiết bị y tế","Tiêm chủng","Bệnh","Góc sức khỏe","Hệ thống nhà thuốc"];
    
    return (
        <div style={{padding:'0 120px'}}>
            <WrapperTypeProduct>
            {arr.map((item) => {
                return (
                    <TypeProduct name={item} key ={item}/>    
                );
            })}
            </WrapperTypeProduct>
            HomePage
        </div>
    );
}

export default HomePage;
