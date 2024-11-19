import React, { useState } from "react";
import { WrapperContainer, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
import {
  CloseSquareFilled,
  EyeFilled,
  EyeInvisibleFilled,
} from "@ant-design/icons";
const SignUpPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRetypePassword, setIsShowRetypePassword] = useState(false);
  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnchangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleOnchangeRetypePassword = (e) => {
    setRetypePassword(e.target.value);
  };

  const handleSignUp = () => {
    console.log(email, password, retypePassword);
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
          height: "500px",
          borderRadius: "10px",
          background: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WrapperContainer>
          <h2>Đăng ký</h2>
          <p>Đăng ký ngay để hưởng những đặc quyền dành cho thành viên</p>

          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="example@gmail.com"
            value={email}
            onChange={handleOnchangeEmail}
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
              onChange={handleOnchangePassword}
            />
          </div>

          <div style={{ position: "relative", width: "100%" }}>
            <span
              onClick={() => setIsShowRetypePassword(!isShowRetypePassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "35px",
                right: "10px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              {isShowRetypePassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              style={{ marginBottom: "10px" }}
              placeholder="retype password"
              type={isShowRetypePassword ? "text" : "password"}
              value={retypePassword}
              onChange={handleOnchangeRetypePassword}
            />
          </div>

          <ButtonComponent
            disabled={!(email && password && retypePassword)}
            onClick={handleSignUp}
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
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <p style={{ fontSize: "15px", margin: 0 }}>
              Bạn đã có tài khoản ?{" "}
            </p>
            <div
              onClick={handleNavigateSignIn}
              style={{ fontSize: "15px", cursor: "pointer" }}
            >
              <WrapperTextLight>Đăng nhập</WrapperTextLight>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
