import { Col, Row, Pagination } from 'antd';
import React, { useState } from 'react';
import Loading from '../../components/LoadingComponent/Loading';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../service/ProductService';
import CardComponent from '../../components/CardComponent/CardComponent';
import FilterBar from '../../components/FilterBar/FilterBar';
import { WrapperNavBar, WrapperProducts } from './style';

const ProductPage = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        manufacturer: [],
        country: [],
        discount: null,
        priceRange: [0, 1000000]
    });

    const { isLoading, data: products } = useQuery({
        queryKey: ['products', page, filters], // Add filters to queryKey
        queryFn: ({ signal }) => ProductService.getAllProduct(page, 8, signal, filters),
        staleTime: 5 * 60 * 1000,
        keepPreviousData: true,
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPage(1); // Reset to first page when filters change
    };

    const onChange = (currentPage) => {
        setPage(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div style={{width: '100%', background: '#edf0f3', padding: '20px 120px'}}>
            <Row style={{ flexWrap: 'nowrap' }}>
                <WrapperNavBar span={6}>
                    <FilterBar 
                        onFilterChange={handleFilterChange} 
                        currentFilters={filters}
                    />
                </WrapperNavBar>
                <Col span={18}>
                    {isLoading ? (
                        <Loading />
                    ) : products?.data?.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            Không tìm thấy sản phẩm phù hợp
                        </div>
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
                                total={products?.pagination?.total || 0}
                                pageSize={8}
                                onChange={onChange}
                                style={{ margin: '30px 0', textAlign: 'center' }}
                                showSizeChanger={false}
                            />
                        </>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default ProductPage;