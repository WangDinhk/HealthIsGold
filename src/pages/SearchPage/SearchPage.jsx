import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spin, message } from 'antd';
import { SearchOutlined, WarningOutlined, InboxOutlined } from '@ant-design/icons';
import CardComponent from '../../components/CardComponent/CardComponent';
import { searchProducts } from '../../service/ProductService';
import { 
    WrapperSearchPage, 
    WrapperSearchHeader, 
    WrapperSearchResults,
    LoadingWrapper,
    ErrorMessage,
    EmptyResult
} from './style';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const keyword = searchParams.get('keyword') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            if (!keyword) {
                setProducts([]);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await searchProducts(keyword);
                if (response.status === "OK" && Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    setError('Invalid response format');
                    message.error('Có lỗi xảy ra khi tìm kiếm');
                }
            } catch (error) {
                console.error('Search error:', error);
                setError(error.message);
                message.error('Có lỗi xảy ra khi tìm kiếm');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [keyword]);

    return (
        <WrapperSearchPage>
            <WrapperSearchHeader>
                {keyword && (
                    <h2>
                        <SearchOutlined style={{ fontSize: '24px', color: '#2167DD' }} />
                        Kết quả tìm kiếm cho 
                        <span className="keyword-highlight">"{keyword}"</span>
                        <span className="result-count">({products.length} sản phẩm)</span>
                    </h2>
                )}
            </WrapperSearchHeader>
            
            <WrapperSearchResults>
                {loading ? (
                    <LoadingWrapper>
                        <Spin size="large" tip="Đang tìm kiếm..." />
                    </LoadingWrapper>
                ) : error ? (
                    <ErrorMessage>
                        <WarningOutlined style={{ fontSize: '20px' }} />
                        {error}
                    </ErrorMessage>
                ) : (
                    <div className="homepage-style">
                        {products.map((product) => (
                            <div key={product._id} className="card-item">
                                <CardComponent
                                    _id={product._id}  
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    discount={product.discount}
                                    unit={product.unit}
                                    quantity={product.quantity}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {!loading && products.length === 0 && keyword && (
                    <EmptyResult>
                        <InboxOutlined className="empty-icon" />
                        <div className="empty-text">
                            Không tìm thấy sản phẩm phù hợp với từ khóa 
                            <span className="keyword">"{keyword}"</span>
                        </div>
                    </EmptyResult>
                )}
            </WrapperSearchResults>
        </WrapperSearchPage>
    );
};

export default SearchPage;
