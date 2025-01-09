import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (page = 1, limit = 8, signal, filters = {}) => {

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(filters.target?.length && { target: filters.target }),
        ...(filters.manufacturer?.length && { manufacturer: filters.manufacturer }),
        ...(filters.country?.length && { country: filters.country }),
        ...(filters.discount && { discount: filters.discount }),
        ...(filters.priceRange && { priceRange: filters.priceRange.join('-') })
    });

    const url = `${process.env.REACT_APP_API_URL}/product/get-all?${queryParams.toString()}`;

    const res = await axios.get(url, { signal });
    return res.data;
}

export const createProduct = async (data) => {
    const res =  await axios.post(`${process.env.REACT_APP_API_URL}/product/create`,data);
    return res.data;
}
export const getDetailsProduct = async (id) => {
    const res =  await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`);
    return res.data;
}

export const updateProduct = async (id,accessToken, data) => {
    const res =  await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product//update/${id}`,data, {
        headers: {
            token: `Bearer ${accessToken}`,
        }});
    console.log("res.data", res.data);
    return res.data;
}
export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
};

export const getProductsByType = async (type) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-by-type/${type}`);
  return res.data;
}

export const prefetchProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`);
    return res.data;
}

export const prefetchProductsByType = async (type) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-by-type/${type}`);
    return res.data;
}

export const getFilterOptions = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/filter-options`);
    return res.data;
}

export const searchProducts = async (keyword, page = 1, limit = 10) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/search`, {
        params: { 
            keyword,
            page,
            limit
        }
    });
    return res.data;
}

export const getNewestProducts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/newest`);
    return res.data;
}
