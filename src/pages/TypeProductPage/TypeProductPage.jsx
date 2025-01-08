import { Col, Row, Pagination } from 'antd';
import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loading from '../../components/LoadingComponent/Loading';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../service/ProductService';
import CardComponent from '../../components/CardComponent/CardComponent';
import FilterBar from '../../components/FilterBar/FilterBar';
import { WrapperNavBar, WrapperProducts } from './style';

const TypeProductPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        target: [],
        manufacturer: [],
        country: [],
        priceRange: [0, 1000000]
    });

    const currentPage = parseInt(searchParams.get('page')) || 1;
    const limit = 8;

    const { isLoading, data: products } = useQuery({
        queryKey: ['products', currentPage, filters], // Đảm bảo currentPage là dependency
        queryFn: () => ProductService.getAllProduct(currentPage, limit, null, filters),
        keepPreviousData: true,
        staleTime: 60000, // Tăng staleTime lên để tránh fetch lại quá nhanh
        cacheTime: 300000,
    });

    const handlePageChange = useCallback((newPage) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('page', newPage.toString());
            return newParams;
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [setSearchParams]);

    const handleFilterChange = useCallback((newFilters) => {
        // Chỉ reset page khi filters thực sự thay đổi
        const hasFilterChanged = JSON.stringify(filters) !== JSON.stringify(newFilters);
        
        setFilters(newFilters);
        
        if (hasFilterChanged) {
            setSearchParams(prev => {
                const newParams = new URLSearchParams(prev);
                // Chỉ reset page về 1 khi filters thay đổi
                newParams.set('page', '1');
                return newParams;
            });
        }
    }, [setSearchParams, filters]);

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
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <Pagination 
                                    current={currentPage}
                                    total={products?.pagination?.total || 0}
                                    pageSize={limit}
                                    onChange={handlePageChange}
                                    showSizeChanger={false}
                                    showTotal={(total, range) => 
                                        `${range[0]}-${range[1]} của ${total} sản phẩm`
                                    }
                                />
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default TypeProductPage;