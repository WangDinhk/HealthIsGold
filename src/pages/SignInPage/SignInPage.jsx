import React, { useState } from "react";
import { WrapperContainer, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import * as UserService from "../../service/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
const SignInPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const mutation = useMutationHook((data) => UserService.loginUser(data));
  

  const {data, isLoading} = mutation;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnchangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSignIn = () => {
    mutation.mutate({ email, password });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "450px",
          height: "480px",
          borderRadius: "10px",
          background: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WrapperContainer>
          <h2>Đăng nhập</h2>
          <p>Vui lòng đăng nhập để hưởng những đặc quyền dành cho thành viên</p>
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="example@gmail.com"
            value={email}
            handleOnchange={handleOnchangeEmail}
          />
          <div style={{ position: "relative", width: "100%" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "35px",
                right: "10px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              style={{ marginBottom: "10px" }}
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              handleOnchange={handleOnchangePassword}
            />
          </div>
          {data?.status === 'ERR' &&
          <span style={{ color: "red" }}>{data?.message}</span>}
            <ButtonComponent
              disabled={!(email && password)}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                backgroundColor: "rgb(33, 112, 250)",
                color: "white",
                borderRadius: 20,
                width: "100%",
                height: 40,
                fontSize: 20,
                marginTop: 20,
              }}
              textButton={"Tiếp tục"}
              styleTextButton={{
                color: "white",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
        </WrapperContainer>
        <div style={{ paddingLeft: "50px" }}>
          <WrapperTextLight>Quên mật khẩu ?</WrapperTextLight>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <p style={{ fontSize: "15px", margin: 0 }}>
              Bạn chưa có tài khoản ?
            </p>
            <div
              onClick={handleNavigateSignUp}
              style={{ fontSize: "15px", cursor: "pointer" }}
            >
              <WrapperTextLight>Đăng ký</WrapperTextLight>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
