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
        <div style={{width: '100%', background: '#edf0f3', padding: '20px 120px'}}>
            <Row style={{ flexWrap: 'nowrap' }}>
                <WrapperNavBar span={6}>
                    <NavBarComponentLeft />
                </WrapperNavBar>
                <Col span={18}>
                    <WrapperProducts>
                        {products?.data?.map((product) => (
                            <CardComponent
                                key={product._id}
                                {...product}
                            />
                        ))}
                    </WrapperProducts>
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
                </Col>
            </Row>
        </div>
    );
}

export default TypeProductPage;