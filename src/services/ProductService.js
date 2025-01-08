const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
        name,
        image,
        type,
        price,
        discount,
        countInStock,
        manufacturer,
        description,
        unit,
        country,
        target,
        quantity,
        ingredient,
    } = newProduct;

    try {
      const checkProduct = await Product.findOne({
        name: name,
      });

      // Kiểm tra sản phẩm đã tồn tại hay chưa
      if (checkProduct !== null) {
        resolve({
          status: "OK",
          message: "The name of the product is existed.",
        });
      }

      // Tạo sản phẩm mới
      const createNewProduct = await Product.create({
        name,
        image,
        type,
        price,
        discount,
        countInStock,
        manufacturer,
        description,
        unit,
        country,
        target,
        quantity,
        ingredient,
    });

      if (newProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createNewProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });

      // Kiểm tra sản phẩm có tồn tại không
      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not define.",
        });
      }

      // Cập nhật thông tin sản phẩm
      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });

      // Kiểm tra sản phẩm có tồn tại không
      if (product === null) {
        resolve({
          status: "OK",
          message: "The product is not define.",
        });
      }

      // Xuât thông tin sản phẩm
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = async (currentPage, limit = 10, sortOption, filters = {}) => {
  try {
    const skip = (currentPage - 1) * limit;
    
    // Build filter query
    const filterQuery = {};
    
    if (filters.target && Array.isArray(filters.target) && filters.target.length > 0) {
      filterQuery.target = { $in: filters.target };
    }
    
    if (filters.manufacturer && Array.isArray(filters.manufacturer) && filters.manufacturer.length > 0) {
      filterQuery.manufacturer = { $in: filters.manufacturer };
    }
    
    if (filters.country && Array.isArray(filters.country) && filters.country.length > 0) {
      filterQuery.country = { $in: filters.country };
    }
    
    if (filters.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
      filterQuery.price = {
        $gte: filters.priceRange[0],
        $lte: filters.priceRange[1]
      };
    }

    if (filters.discount) {
      filterQuery.discount = { $gte: filters.discount };
    }

    const totalProduct = await Product.countDocuments(filterQuery);
    
    const allProduct = await Product.find(filterQuery)
      .skip(skip)
      .limit(limit)
      .sort(sortOption ? { [sortOption[0]]: sortOption[1] } : {});
          
    return {
      status: "Ok",
      message: "Success", 
      data: allProduct,
      pagination: {
        total: totalProduct,
        currentPage,
        totalPages: Math.ceil(totalProduct / limit),
        pageSize: limit
      }
    };
  } catch (e) {
    return {
      status: "ERR",
      message: e.message,
    };
  }
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });

      // Kiểm tra sản phẩm có tồn tại không
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not define.",
        });
      }

      // Xóa sản phẩm
      await Product.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "DELETE PRODUCT SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getProductsByType = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await Product.find({ type: type });
      
      if (!products || products.length === 0) {
        resolve({
          status: "OK",
          message: "No products found for this type",
          data: []
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: products
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getFilterOptions = async () => {
  try {
    // Get unique manufacturers
    const manufacturers = await Product.distinct('manufacturer');
    
    // Get unique countries
    const countries = await Product.distinct('country');
    
    // Get price range
    const priceStats = await Product.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }
    ]);

    console.log('Filter options:', { manufacturers, countries }); // Add this debug log

    return {
      status: "OK",
      data: {
        manufacturers,
        countries,
        priceRange: priceStats[0] 
          ? [priceStats[0].minPrice, priceStats[0].maxPrice] 
          : [0, 1000000]
      }
    };
  } catch (e) {
    console.error('Error getting filter options:', e); // Add error logging
    return {
      status: "ERR",
      message: e.message
    };
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  getProductsByType, // Add this new export
  getFilterOptions ,
};

