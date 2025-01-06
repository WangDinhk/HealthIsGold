import React, { useState, useEffect } from 'react';
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, Checkbox, Radio, Slider, Space, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../service/ProductService';
import {
  WrapperHead,
  WrapperBody,
  WrapperNavBar,
  FilterGroup,
  FilterItem,
  PriceRangeInput
} from "./style";

const { Panel } = Collapse;

const NavBarComponentLeft = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    manufacturer: [],
    country: [],
    discount: null,
    priceRange: [0, 1000000]
  });

  // Fetch filter options
  const { data: filterOptions, isLoading } = useQuery({
    queryKey: ['filter-options'],
    queryFn: ProductService.getFilterOptions,
    staleTime: 30 * 60 * 1000, // Cache for 30 minutes
  });

  // Add this console.log to debug
  console.log('filterOptions:', filterOptions);

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Format price for display
  const formatPrice = (value) => `${value.toLocaleString('vi-VN')}đ`;

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <WrapperNavBar>
      <WrapperHead>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 16H14C14.5523 16 15 16.4477 15 17C15 17.5128 14.614 17.9355 14.1166 17.9933L14 18H10C9.44772 18 9 17.5523 9 17C9 16.4872 9.38604 16.0645 9.88338 16.0067L10 16H14H10ZM8 11H16C16.5523 11 17 11.4477 17 12C17 12.5128 16.614 12.9355 16.1166 12.9933L16 13H8C7.44772 13 7 12.5523 7 12C7 11.4872 7.38604 11.0645 7.88338 11.0067L8 11H16H8ZM5 6H19C19.5523 6 20 6.4477 20 7C20 7.51284 19.614 7.93551 19.1166 7.99327L19 8H5C4.44772 8 4 7.55228 4 7C4 6.48716 4.38604 6.06449 4.88338 6.00673L5 6H19H5Z" fill="currentColor"/>
        </svg>
        <span>Bộ lọc nâng cao</span>
      </WrapperHead>

      <WrapperBody>
        <Collapse
          defaultActiveKey={['manufacturer', 'country', 'discount', 'price']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        >
          <Panel header="Thương hiệu" key="manufacturer">
            <FilterGroup>
              {isLoading ? (
                <Spin size="small" />
              ) : filterOptions?.data?.manufacturers ? (
                filterOptions.data.manufacturers.map(mfr => (
                  <FilterItem key={mfr}>
                    <Checkbox
                      checked={filters.manufacturer.includes(mfr)}
                      onChange={(e) => {
                        const newManufacturers = e.target.checked
                          ? [...filters.manufacturer, mfr]
                          : filters.manufacturer.filter(m => m !== mfr);
                        handleFilterChange('manufacturer', newManufacturers);
                      }}
                    >
                      {mfr}
                    </Checkbox>
                  </FilterItem>
                ))
              ) : (
                <div>Không có dữ liệu thương hiệu</div>
              )}
            </FilterGroup>
          </Panel>

          <Panel header="Xuất xứ" key="country">
            <FilterGroup>
              {isLoading ? (
                <Spin size="small" />
              ) : filterOptions?.data?.countries ? (
                filterOptions.data.countries.map(country => (
                  <FilterItem key={country}>
                    <Checkbox
                      checked={filters.country.includes(country)}
                      onChange={(e) => {
                        const newCountries = e.target.checked
                          ? [...filters.country, country]
                          : filters.country.filter(c => c !== country);
                        handleFilterChange('country', newCountries);
                      }}
                    >
                      {country}
                    </Checkbox>
                  </FilterItem>
                ))
              ) : (
                <div>Không có dữ liệu xuất xứ</div>
              )}
            </FilterGroup>
          </Panel>

          <Panel header="Giảm giá" key="discount">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Radio.Group
                value={filters.discount}
                onChange={(e) => handleFilterChange('discount', e.target.value)}
              >
                <Space direction="vertical">
                  <Radio value={10}>Từ 10% trở lên</Radio>
                  <Radio value={20}>Từ 20% trở lên</Radio>
                  <Radio value={30}>Từ 30% trở lên</Radio>
                  <Radio value={50}>Từ 50% trở lên</Radio>
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
              />
              <div className="price-range-display">
                <span>{formatPrice(filters.priceRange[0])}</span>
export default NavBarComponentLeft;
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
            </PriceRangeInput>
          </Panel>
        </Collapse>
      </WrapperBody>
    </WrapperNavBar>
  );
};

export default NavBarComponentLeft;

