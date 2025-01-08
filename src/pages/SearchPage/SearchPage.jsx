import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Row, Col, Spin, message } from 'antd';
import CardComponent from '../../components/CardComponent/CardComponent';
import { searchProducts } from '../../service/ProductService';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
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

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ margin: '20px 0' }}>
                {keyword && (
                    <h2>Kết quả tìm kiếm cho "{keyword}" ({products.length} sản phẩm)</h2>
                )}
            </div>
            
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Spin size="large" />
                </div>
            ) : error ? (
                <div style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>
                    {error}
                </div>
            ) : (
                <Row gutter={[16, 16]}>
                    {products.map((product) => (
                        <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                            <div onClick={() => handleProductClick(product._id)} 
                                 style={{ cursor: 'pointer' }}>
                                <CardComponent 
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    discount={product.discount}
                                    selled={product.selled}
                                    id={product._id}
                                />
                            </div>
                        </Col>
                    ))}
                </Row>
            )}

            {!loading && products.length === 0 && keyword && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    Không tìm thấy sản phẩm phù hợp với từ khóa "{keyword}"
                </div>
            )}
        </div>
    );
};

export default SearchPage;
