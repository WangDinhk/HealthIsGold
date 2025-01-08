import React, { useEffect, useState } from "react";
import { WrapperLabel } from './style'
import { useSelector, useDispatch } from 'react-redux';
import * as CartService from '../../service/CartService';
import { WrapperContainer, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import * as UserService from "../../service/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from "../../components/LoadingComponent/Loading";
import { jwtDecode } from "jwt-decode";
import { updateUser } from "../../redux/slides/userSlide";
import * as message from '../../components/Message/Message'

const PaymentPage = () => {
    const navigate = useNavigate();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const queryClient = useQueryClient();

    const mutation = useMutationHook((data) => UserService.loginUser(data));

    const { isLoading, data: cartData } = useQuery({
        queryKey: ['cart', user?.id],
        queryFn: () => CartService.getUserCart(user?.id),
        enabled: !!user?.id
    });


    //const { data, isLoading, isSuccess, isError } = mutation;
    // useEffect(() => {
    //     if (isSuccess) {
    //         navigate('/');
    //         console.log('data', data);
    //         localStorage.setItem('accessToken', JSON.stringify(data?.accessToken));
    //         if (data?.accessToken) {
    //             const decoded = jwtDecode(data?.accessToken);
    //             console.log('decoded', decoded);
    //             if (decoded?.id) {
    //                 handleGetDetailsUser(decoded?.id, data?.accessToken)
    //             }
    //         }
    //     }
    //     else if (isError) {
    //         message.error();
    //     }
    // }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, accessToken: token }))
    }
    const [accountNumber, setEmail] = useState("");
    const [accountName, setPassword] = useState("");

    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleOnchangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleBankInfo = () => {
        mutation.mutate({ accountNumber, accountName });
    };
    return (
        <Loading isLoading={isLoading}>
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
                        width: "600px",
                        height: "600px",
                        borderRadius: "10px",
                        background: "white",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <WrapperContainer>
                        <h2>Thông tin thẻ ngân hàng</h2>
                        <WrapperLabel htmlFor='number'>Số tài khoản</WrapperLabel>
                        <InputForm
                            style={{ marginBottom: "10px" }}
                            placeholder="00xx xxxx xxxx xxxx"
                            value={accountNumber}
                            handleOnchange={handleOnchangeEmail}
                        />
                        <div style={{ position: "relative", width: "100%" }}>
                            {/* <span
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
                                Test
                                {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                            </span> */}
                            <WrapperLabel htmlFor='name'>Tên chủ tài khoản</WrapperLabel>
                            <InputForm
                                style={{ marginBottom: "10px" }}
                                placeholder="password"
                                type={isShowPassword ? "text" : "password"}
                                value={accountName}
                                handleOnchange={handleOnchangePassword}
                            />
                        </div>
                        <h2>Thông tin đơn hàng</h2>
                        <WrapperLabel htmlFor='money'>Mã đơn hàng</WrapperLabel>
                        <InputForm
                            style={{ marginBottom: "10px" }}
                            placeholder="Madonhang"
                            readOnly
                        />
                        <div style={{ position: "relative", width: "100%" }}>
                            <WrapperLabel htmlFor='money'>Tổng tiền</WrapperLabel>
                            <InputForm
                                style={{ marginBottom: "10px" }}
                                placeholder="Sotien"
                                readOnly
                            />
                        </div>
                        {/* {data?.status === 'ERR' &&
                            <span style={{ color: "red" }}>{data?.message}</span>} */}
                        <ButtonComponent
                            disabled={!(accountNumber && accountName)}
                            //onClick={handleSignIn}
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
                            textButton={"Thanh toán"}
                            styleTextButton={{
                                color: "white",
                                fontSize: "15px",
                                fontWeight: "700",
                            }}
                        />
                    </WrapperContainer>
                    {/* <div style={{ paddingLeft: "50px" }}>
                        <WrapperTextLight>Quên mật khẩu ?</WrapperTextLight>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <p style={{ fontSize: "15px", margin: 0 }}>
                                Bạn chưa có tài khoản ?
                            </p>
                            <div
                                // onClick={}
                                style={{ fontSize: "15px", cursor: "pointer" }}
                            >
                                <WrapperTextLight>Đăng ký</WrapperTextLight>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </Loading>
    );
};

export default PaymentPage;
