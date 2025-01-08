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

const getAllProduct = async (page = 1, limit = 8, filters = {}) => {
  try {
    const skip = (page - 1) * limit;
    
    // Build filter query
    const filterQuery = {};
    if (filters.manufacturer?.length) filterQuery.manufacturer = { $in: filters.manufacturer };
    if (filters.country?.length) filterQuery.country = { $in: filters.country };
    if (filters.target?.length) filterQuery.target = { $in: filters.target };
    if (filters.discount) filterQuery.discount = { $gte: Number(filters.discount) };
    if (filters.priceRange?.length === 2) {
      filterQuery.price = {
        $gte: Number(filters.priceRange[0]),
        $lte: Number(filters.priceRange[1])
      };
    }

    // Thêm sort để đảm bảo thứ tự nhất quán
    const sortCriteria = {
      createdAt: -1,  // Sort by creation date descending
      _id: 1          // Then by _id to đảm bảo thứ tự ổn định
    };

    // Execute queries in parallel với sort và distinct
    const [totalCount, products] = await Promise.all([
      Product.countDocuments(filterQuery),
      Product.find(filterQuery)
        .sort(sortCriteria)
        .skip(skip)
        .limit(limit)
        .collation({ locale: 'vi' })  // Thêm collation để sắp xếp đúng tiếng Việt
        .lean()
        .exec()
    ]);

    // Kiểm tra trùng lặp bằng Set (debug)
    const productIds = new Set();
    const duplicates = products.filter(product => {
      if (productIds.has(product._id.toString())) {
        console.log('Duplicate found:', product._id);
        return true;
      }
      productIds.add(product._id.toString());
      return false;
    });

    if (duplicates.length > 0) {
      console.warn('Found duplicate products:', duplicates.length);
    }

    return {
      status: "Ok",
      message: "Success",
      data: products,
      pagination: {
        total: totalCount,
        pageSize: limit,
        current: page,
        totalPages: Math.ceil(totalCount / limit)
      }
    };
  } catch (error) {
    console.error("Error in getAllProduct:", error);
    throw error;
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

