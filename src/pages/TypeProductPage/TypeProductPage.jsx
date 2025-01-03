import { Col, Row, Pagination } from 'antd';
import React, { Fragment, useState } from 'react';
import Loading from '../../components/LoadingComponent/Loading';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../service/ProductService';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavBarComponentLeft from '../../components/NavBarComponentLeft/NavBarComponentLeft';
import { WrapperNavBar, WrapperProducts } from './style';

const TypeProductPage = () => {
    const [page, setPage] = useState(1);
    const limit = 20;

    const { isLoading, data: products } = useQuery({
        queryKey: ['products', page],
        queryFn: ({ signal }) => ProductService.getAllProduct(page, limit, signal),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    });

    const onChange = (newPage) => {
        setPage(newPage);
    }

    return (
        <div style={{width: '100%', background: '#edf0f3', padding: '20px 120px'}}>
            <Row style={{ flexWrap: 'nowrap' }}>
                <WrapperNavBar span={6}>
                    <NavBarComponentLeft />
                </WrapperNavBar>
                <Col span={18}>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <>
                            <WrapperProducts>
                                {products?.data?.map((product) => (
                                    <CardComponent
                                        key={product._id}
                                        {...product}
                                    />
                                ))}
                            </WrapperProducts>
                            <Pagination 
                                current={page}
                                total={products?.total || 0}
                                onChange={onChange}
                                pageSize={limit}
                                style={{ margin: '30px 0', textAlign: 'center' }}
                            />
                        </>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default React.memo(TypeProductPage);