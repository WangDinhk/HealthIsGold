import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./service/UserService";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";
function App() {
const dispatch=useDispatch();
  useEffect(() => {
    // let storageData= localStorage.getItem('accessToken')
    const {storageData,decoded}= handleDecoded()
 
      if (decoded?.id) {
        handleGetDetailsUser(decoded?.id, storageData);
      }
    
    console.log("ac",storageData)
  }, []);
  ///
  const handleDecoded=()=>{
    let storageData= localStorage.getItem('accessToken')
    let decoded={}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
      
    }
    return {decoded,storageData}
  }
  //
 UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
  
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers['token'] = `Bearer ${data?.accessToken}`;
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
  const handleGetDetailsUser = async (id,token)=>{
    const res= await UserService.getDetailsUser(id,token);
    dispatch(updateUser({...res?.data,accessToken : token}))
  }
  
  const fetchAPi = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.get(`${apiUrl}/product/get-all`);
      return res.data;
    } catch (error) {
      console.error('Error fetching API:', error);
    }
  }

  const query = useQuery({ queryKey: ['todos'], queryFn: fetchAPi })
  console.log('query',query);


  return (
    <div>
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
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
