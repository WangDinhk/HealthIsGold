import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (page = 1, limit = 8, signal) => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-all?page=${page}&limit=${limit}`,
        { signal }
    );
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
