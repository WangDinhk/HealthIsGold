import axios from "axios";
import { axiosJWT } from "./UserService";

export const getDashboardData = async () => {
  try {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/admin/dashboard`);
    return res.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const getAdminStats = async () => {
  try {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/admin/stats`);
    return res.data;
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    throw error;
  }
};

// Add more admin-specific API calls as needed
