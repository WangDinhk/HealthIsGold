import { Col, Row, Pagination } from 'antd';
import React, { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../service/ProductService';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavBarComponentLeft from '../../components/NavBarComponentLeft/NavBarComponentLeft';
import { WrapperNavBar, WrapperProducts } from './style';

const TypeProductPage = () => {
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    const { isLoading, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductAll,
    });

    const onChange = () => {}

    return (
        <div style={{backgroundColor :'#edf0f3', padding :'20px 120px'}}>
            <Fragment>
                <Row style={{flexWrap : 'nowrap', padding:'20px 0', position:"relative"}}>
                    <WrapperNavBar span={6} style={{position:"sticky", top:"0"}}>
                        <NavBarComponentLeft/>
                    </WrapperNavBar>
                    <WrapperProducts span={18}>
                        {products?.data?.map((product) => (
                            <CardComponent
                                key={product._id}
                                _id={product._id}  // Add this line
                                countInStock={product.countInStock}
                                description={product.description}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                type={product.type}
                                manufacturer={product.manufacturer}
                                discount={product.discount}
                                unit={product.unit}
                                country={product.country}
                                target={product.target}
                                quantity={product.quantity}
                                ingredient={product.ingredient}
                            />
                        ))}
                    </WrapperProducts>
                </Row>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    margin: '30px 0'
                }}>
                    <Pagination 
                        defaultCurrent={1} 
                        total={products?.data?.length || 0}
                        onChange={onChange}
                        pageSize={20}
                    />
                </div>
            </Fragment>
        </div>
    );
}

export default TypeProductPage;