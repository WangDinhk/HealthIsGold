import React, { useState, useEffect } from 'react';
import { Collapse, Checkbox, Radio, Slider, Space, Spin, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../service/ProductService';
import {
  WrapperHead,
  WrapperBody,
  WrapperNavBar,
  FilterGroup,
  FilterItem,
  PriceRangeInput,
  ShowMoreButton
} from "./style";

const { Panel } = Collapse;

const INITIAL_VISIBLE_ITEMS = 3; // Number of items to show initially
const ITEMS_PER_LOAD = 3; // Number of additional items to show each time

const INITIAL_FILTERS = {
  manufacturer: [],
  country: [],
  discount: [],
  priceRange: [0, 1000000]
};

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // State for expanded sections
  const [expanded, setExpanded] = useState({
    manufacturer: false,
    country: false
  });

  // Track number of items shown for each filter type
  const [visibleItems, setVisibleItems] = useState({
    manufacturer: INITIAL_VISIBLE_ITEMS,
    country: INITIAL_VISIBLE_ITEMS
  });

  const { data: filterOptions, isLoading } = useQuery({
    queryKey: ['filter-options'],
    queryFn: ProductService.getFilterOptions,
    staleTime: 30 * 60 * 1000,
  });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  useEffect(() => {
    // Call parent's onFilterChange whenever filters change
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setVisibleItems({
      manufacturer: INITIAL_VISIBLE_ITEMS,
      country: INITIAL_VISIBLE_ITEMS
    });
    onFilterChange(INITIAL_FILTERS);
  };

  const formatPrice = (value) => `${value.toLocaleString('vi-VN')}đ`;

  const renderFilterItems = (items, type) => {
    if (!items) return null;
    
    const currentVisibleCount = visibleItems[type];
    const visibleData = items.slice(0, currentVisibleCount);
    const hasMore = currentVisibleCount < items.length;
    
    return (
      <>
        {visibleData.map(item => (
          <FilterItem key={item}>
            <Checkbox
              checked={filters[type].includes(item)}
              onChange={(e) => {
                const newValues = e.target.checked
                  ? [...filters[type], item]
                  : filters[type].filter(v => v !== item);
                handleFilterChange(type, newValues);
              }}
            >
              {item}
            </Checkbox>
          </FilterItem>
        ))}
        
        {hasMore && (
          <ShowMoreButton
            type="link"
            onClick={() => setVisibleItems(prev => ({
              ...prev,
              [type]: prev[type] + ITEMS_PER_LOAD
            }))}
          >
            {`Xem thêm ${Math.min(ITEMS_PER_LOAD, items.length - currentVisibleCount)} lựa chọn`}
          </ShowMoreButton>
        )}

        {currentVisibleCount > INITIAL_VISIBLE_ITEMS && (
          <ShowMoreButton
            type="link"
            onClick={() => setVisibleItems(prev => ({
              ...prev,
              [type]: INITIAL_VISIBLE_ITEMS
            }))}
          >
            Thu gọn
          </ShowMoreButton>
        )}
      </>
    );
  };

  return (
    <WrapperNavBar>
      <WrapperHead>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm3 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm3 6a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1z" fill="currentColor"/>
        </svg>
        <span>Lọc sản phẩm</span>
        <Button 
          type="primary" 
          size="small" 
          onClick={handleResetFilters}
          style={{ marginLeft: 'auto' }}
        >
          Reset
        </Button>
      </WrapperHead>

      <WrapperBody>
        <Collapse 
          defaultActiveKey={['manufacturer', 'country', 'discount', 'price']}
          expandIconPosition="end"
          ghost
        >
          <Panel header="Thương hiệu" key="manufacturer">
            <FilterGroup>
              {isLoading ? (
                <Spin size="small" />
              ) : filterOptions?.data?.manufacturers ? (
                renderFilterItems(filterOptions.data.manufacturers, 'manufacturer')
              ) : (
                <div>Không có dữ liệu</div>
              )}
            </FilterGroup>
          </Panel>

          <Panel header="Xuất xứ" key="country">
            <FilterGroup>
              {isLoading ? (
                <Spin size="small" />
              ) : filterOptions?.data?.countries ? (
                renderFilterItems(filterOptions.data.countries, 'country')
              ) : (
                <div>Không có dữ liệu</div>
              )}
            </FilterGroup>
          </Panel>

          <Panel header="Mức giảm giá" key="discount">
            <Space direction="vertical" style={{ width: '100%', paddingTop: '8px' }}>
              <Radio.Group
                value={filters.discount}
                onChange={(e) => handleFilterChange('discount', e.target.value)}
              >
                <Space direction="vertical" size={12}>
                  <Radio value={5}>Từ 5% trở lên</Radio>
                  <Radio value={10}>Từ 10% trở lên</Radio>
                  <Radio value={15}>Từ 15% trở lên</Radio>

                </Space>
              </Radio.Group>
            </Space>
          </Panel>

          <Panel header="Khoảng giá" key="price">
            <PriceRangeInput>
              <Slider
                range
                min={0}
                max={1000000}
                step={50000}
                value={filters.priceRange}
                onChange={(value) => handleFilterChange('priceRange', value)}
                tipFormatter={formatPrice}
                tooltip={{ formatter: formatPrice }}
              />
              <div className="price-range-display">
                <span>{formatPrice(filters.priceRange[0])}</span>
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
            </PriceRangeInput>
          </Panel>
        </Collapse>
      </WrapperBody>
    </WrapperNavBar>
  );
};

export default FilterBar;

