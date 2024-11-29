import React from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperLabel, WrapperInput } from './style'
import InputForm from "../../components/InputForm/InputForm";
import { useState } from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import * as UserService from '../../service/UserService'
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading'
import { message } from 'antd';

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [phone, setPhone] = useState(user?.phone)
    const [address, setAddress] = useState(user?.address)
    const [avatar, setAvatar] = useState(user?.avatar)
    const mutation = useMutationHook((id, data) => UserService.UpdateUser(id, data));

    const dispatch = useDispatch()
    const { data, isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        setName(user?.name)
        setEmail(user?.email)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)

        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(UserService.UpdateUser({ ...res?.data, accessToken: token }))
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnchangeAvatar = (value) => {
        setAvatar(value)
    }
    const handleUpdate = () => {
        mutation.mutate(user?.id, { name, email, phone, address, avatar })
        if (isSuccess) {
            message.success()
        } else if (isError) {
            message.error()
        }
    }

    return (
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            {/* <Loading isLoading={isLoading}> */}
            <WrapperContentProfile>
                {/* Name người dùng */}
                <WrapperInput>
                    <WrapperLabel htmlFor='name'>Name</WrapperLabel>
                    <InputForm
                        style={{ width: '300px' }}
                        id='name'
                        value={name}
                        handleOnchange={handleOnchangeName}
                    />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            border: '1px solid rgb(26, 148, 255)',
                            borerRadius: '4px',
                            padding: '6px'
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperInput>
                {/* Eamil người dùng */}
                <WrapperInput>
                    <WrapperLabel htmlFor='email'>Email</WrapperLabel>
                    <InputForm
                        style={{ width: '300px' }}
                        id='email'
                        value={email}
                        handleOnchange={handleOnchangeEmail}
                    />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            border: '1px solid rgb(26, 148, 255)',
                            borerRadius: '4px',
                            padding: '6px'
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperInput>
                {/* Phone người dùng */}
                <WrapperInput>
                    <WrapperLabel htmlFor='phone'>Phone number</WrapperLabel>
                    <InputForm
                        style={{ width: '300px' }}
                        id='phone'
                        value={phone}
                        handleOnchange={handleOnchangePhone}
                    />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            border: '1px solid rgb(26, 148, 255)',
                            borerRadius: '4px',
                            padding: '6px'
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperInput>
                {/* Address người dùng */}
                <WrapperInput>
                    <WrapperLabel htmlFor='address'>Address</WrapperLabel>
                    <InputForm
                        style={{ width: '300px' }}
                        id='address'
                        value={address}
                        handleOnchange={handleOnchangeAddress}
                    />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            border: '1px solid rgb(26, 148, 255)',
                            borerRadius: '4px',
                            padding: '6px'
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperInput>
                {/* Phone người dùng */}
                <WrapperInput>
                    <WrapperLabel htmlFor='avatar'>Avatar</WrapperLabel>
                    <InputForm
                        style={{ width: '300px' }}
                        id='avatar'
                        value={avatar}
                        handleOnchange={handleOnchangeAvatar}
                    />
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            width: 'fit-content',
                            border: '1px solid rgb(26, 148, 255)',
                            borerRadius: '4px',
                            padding: '6px'
                        }}
                        textButton={'Cập nhật'}
                        styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperInput>
            </WrapperContentProfile>
            {/* </Loading> */}
        </div>
    )
}

export default ProfilePage