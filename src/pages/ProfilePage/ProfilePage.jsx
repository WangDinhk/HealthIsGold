import React from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperLabel, WrapperInput, WrapperUploadFile } from './style'
import InputForm from "../../components/InputForm/InputForm";
import { useState } from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import * as UserService from '../../service/UserService'
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading'
import { Button, message, Upload } from 'antd';
import { updateUser } from '../../redux/slides/userSlide';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils';

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [phone, setPhone] = useState(user?.phone)
    const [address, setAddress] = useState(user?.address)
    const [avatar, setAvatar] = useState(user?.avatar)
    const mutation = useMutationHook((data) => {
        const { id, accessToken, ...rests} = data
        UserService.UpdateUser(id, rests, accessToken);
    })

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
            handleGetDetailsUser(user?.id, user?.accessToken)

        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, accessToken: token }))
    }

    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleOnchangeName = (e) => {
        setName(e.target.value)
    }
    const handleOnchangePhone = (e) => {
        setPhone(e.target.value)
    }
    const handleOnchangeAddress = (e) => {
        setAddress(e.target.value)
    }
    const handleOnchangeAvatar = async  ({fileList}) => {
        const file = fileList[0]
        console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }
    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, name, email, phone, address, avatar })
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
                {/* Avatar người dùng */}
                <WrapperInput>
                    <WrapperLabel htmlFor='avatar'>Avatar</WrapperLabel>
                    <WrapperUploadFile  ploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </WrapperUploadFile>
                    {avatar && (
                        <img scr={avatar} style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}alt="avatar"/>
                    )}
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