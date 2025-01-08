import { Col, Row, Pagination } from 'antd';
import React, { Fragment, useState } from 'react';
import Loading from '../../components/LoadingComponent/Loading';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../service/ProductService';
import CardComponent from '../../components/CardComponent/CardComponent';
import FilterBar from '../../components/FilterBar/FilterBar';
import { WrapperNavBar, WrapperProducts } from './style';

const TypeProductPage = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        target: [],
        manufacturer: [],
        country: [],
        priceRange: null
    });
    const limit = 10;

    const { isLoading, data: products } = useQuery({
        queryKey: ['products', page, limit, filters],
        queryFn: ({ signal }) => ProductService.getAllProduct(page, limit, signal, filters),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPage(1); // Reset to first page when filters change
    };

    const onChange = (currentPage) => {
        setPage(currentPage);
    }

    return (
        <div style={{width: '100%', background: '#edf0f3', padding: '20px 120px'}}>
            <Row style={{ flexWrap: 'nowrap' }}>
                <WrapperNavBar span={6}>
                    <FilterBar onFilterChange={handleFilterChange} />
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
                                pageSize={limit}
                                onChange={onChange}
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