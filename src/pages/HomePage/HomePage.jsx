import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { SlideImageContainer, WrapperTypeProduct } from './style';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';
import slider3 from '../../assets/images/slider3.png';
import slider4 from '../../assets/images/slider4.png';
import slider5 from '../../assets/images/slider5.png';


const HomePage = () => {
    const arr = ["Thực phẩm chức năng","Dược mỹ phẩm","Chăm sóc cá nhân","Thuốc","Thiết bị y tế","Tiêm chủng","Bệnh","Góc sức khỏe","Hệ thống nhà thuốc"];
    
    return (
        <>
            <div style={{padding:'0 120px'}}>
                <WrapperTypeProduct>
                {arr.map((item) => {
                    return (
                        <TypeProduct name={item} key ={item}/>    
                    );
                })}
                </WrapperTypeProduct>
            </div>
            <div>
                <SlideImageContainer>
                        <SliderComponent arrImages={[slider1,slider2,slider3,slider4,slider5]} />
                </SlideImageContainer>
            </div>
            
            </>
    );
}

export default HomePage;
