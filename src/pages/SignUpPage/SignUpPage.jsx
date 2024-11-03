import React from "react";
import { WrapperContainer, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
const SignUpPage = () => {
    return (
        <div style={{display : 'flex', alignItems:'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height : '100vh'}}>
            <div style={{width: '450px', height : '500px', borderRadius :'10px', background:'white', alignItems:'center', justifyContent: 'center'}}>
                <WrapperContainer>
                    <h2>Đăng ký</h2>
                    <p>Đăng ký ngay để hưởng những đặc quyền dành cho thành viên</p>
                    <InputForm style = {{marginBottom : '10px'}} placeholder = "example@gmail.com" />
                    <InputForm style = {{marginBottom : '10px'}} placeholder = "password" />
                    <InputForm style = {{marginBottom : '10px'}} placeholder = "retype password" />
                    
                    <ButtonComponent
                        bordered={false}
                        size={40}
                        styleButton={{
                            backgroundColor: "rgb(33, 112, 250)",
                            color: "white",
                            borderRadius: 20,
                            width: '100%',
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
                <div style ={{paddingLeft : '50px'}}>
                    <p style ={{fontSize : '15px'}}>Bạn đã có tài khoản ? <WrapperTextLight> Đăng nhập </WrapperTextLight></p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
