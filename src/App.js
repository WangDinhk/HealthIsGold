import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./service/UserService";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";
import Loading from "./components/LoadingComponent/Loading";
function App() {
  const user = useSelector((state) => state.user);
  const { isLoading, setIsLoading } = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    // let storageData= localStorage.getItem('accessToken')
    const { storageData, decoded } = handleDecoded();
    // console.log(`storageData:`, storageData, isJsonString(storageData),decoded);

    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, []);
  ///
  const handleDecoded = () => {
    let storageData = localStorage.getItem("accessToken");

    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };
  //
  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();

      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        // console.log("Current Cookies:", document.cookie);
        config.headers["token"] = `Bearer ${data?.accessToken}`;
      }

      return config;
    },
    (err) => {
      // Handle request error
      return Promise.reject(err);
    }
  );

  // UserService.axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     // Do something before request is sent
  //     const currentTime = new Date();
  //     const { decoded } = handleDecoded();

  //     if (decoded?.exp < currentTime.getTime() / 1000) {
  //       const data = await UserService.refreshToken();
  //       config.headers['token'] = `Bearer ${data?.access_token}`;
  //     }

  //     return config;
  //   },
  //   (err) => {
  //     // Handle request error
  //     return Promise.reject(err);
  //   }
  // );
  ///
  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, accessToken: token }));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchAPi = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.get(`${apiUrl}/product/get-all`);
      return res.data;
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  const query = useQuery({ queryKey: ["todos"], queryFn: fetchAPi });
  console.log("query", query);

  return (
    <div>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const ischeckAuth = !route.isPrivate || user.isAdmin;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route
                  key={route.path}
                  path={ischeckAuth && route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  );
}

export default App;
