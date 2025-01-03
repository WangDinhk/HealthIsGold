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
import { Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      cacheTime: 30 * 60 * 1000, // 30 minutes
    },
  },
});

function App() {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeUser = async () => {
      setIsLoading(true);
      try {
        const { storageData, decoded } = handleDecoded();
        if (decoded?.id) {
          await handleGetDetailsUser(decoded?.id, storageData);
        }
      } catch (error) {
        console.error('Error initializing user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("accessToken");

    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();

      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.accessToken}`;
      }

      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, accessToken: token }));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Loading isLoading={isLoading}>
          <Router>
            <Routes>
              {routes.map((route) => {
                const Page = route.page;
                const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      route.isPrivate && !user?.isAdmin ? (
                        <Navigate to="/" />
                      ) : (
                        <Layout>
                          <Page />
                        </Layout>
                      )
                    }
                  />
                );
              })}
            </Routes>
          </Router>
        </Loading>
      </div>
    </QueryClientProvider>
  );
}

export default App;
