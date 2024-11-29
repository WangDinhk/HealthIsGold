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
    let storageData= localStorage.getItem('accessToken')
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      const decoded = jwtDecode(storageData);
      if (decoded?.id) {
        handleGetDetailsUser(decoded?.id, storageData);
      }
    }
    console.log("ac",storageData)
  }, []);
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
