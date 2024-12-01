import axios from "axios";
export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-in`,
    data
  );
  return res.data;
};

export const signupUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-up`,
    data
  );
  return res.data;
};

export const getDetailsUser = async (id, accessToken) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/user/getDetailUser/${id}`,
    {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

//

// export const refreshToken = async () => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refreshToken`, {
//         withCredentials: true
//     });
//     return res.data;
// };


export const refreshToken = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/refreshToken`,
    {},
    {
      withCredentials: true, // Đảm bảo cookie được gửi cùng request

    }
  );
  return res.data;
};


//


export const UpdateUser = async (id, data, accessToken) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    });
    return res.data;
}