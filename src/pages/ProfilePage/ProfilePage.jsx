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
    const mutation = useMutationHook(
        (data) => {
            const { id, accessToken, ...rests } = data
            return UserService.UpdateUser(id, rests, accessToken)
        }
    )

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
            message.success('Cập nhật thông tin thành công')
            handleGetDetailsUser(user?.id, user?.accessToken)

        } else if (isError) {
            message.error('Cập nhật thông tin thất bại')
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

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/
        return phoneRegex.test(phone)
    }

    const handleUpdate = () => {
        if (!validatePhone(phone)) {
            message.error('Số điện thoại không hợp lệ')
            return
        }
        
        if (!name || !email || !phone || !address) {
            message.error('Vui lòng điền đầy đủ thông tin')
            return
        }

        mutation.mutate({ 
            id: user?.id, 
            name, 
            email, 
            phone, 
            address, 
            avatar,
            accessToken: user?.accessToken 
        })
    }

    return (
        <div style={{  margin: '0 auto', padding: '20px' ,background:'#EEF0F3'}}>
            <Loading isLoading={isLoading}>
                <WrapperContentProfile>
                <WrapperHeader>Thông tin người dùng</WrapperHeader>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                        <div style={{ position: 'relative' }}>
                            {avatar && (
                                <img 
                                    src={avatar} 
                                    style={{
                                        height: '100px',
                                        width: '100px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '2px solid #1a94ff'
                                    }}
                                    alt="avatar"
                                />
                            )}
                            
                            <WrapperUploadFile 
                                onChange={handleOnchangeAvatar} 
                                maxCount={1}
                                style={{ position: 'absolute', bottom: '-10px', right: '-10px' }}
                            >
                                <Button icon={<UploadOutlined />} size="small">Upload</Button>
                            </WrapperUploadFile>
                        </div>
                    </div>

                    {/* Form fields */}
                    <WrapperInput>
                        <WrapperLabel htmlFor='name'>Họ và tên</WrapperLabel>
                        <div style={{ flex: 1 }}>
                            <InputForm
                                style={{ width: '100%' }}
                                id='name'
                                value={name}
                                handleOnchange={handleOnchangeName}
                            />
                        </div>
                    </WrapperInput>
                    
                    <WrapperInput>
                        <WrapperLabel htmlFor='email'>Email</WrapperLabel>
                        <div style={{ flex: 1 }}>
                            <InputForm
                                style={{ width: '100%' }}
                                id='email'
                                value={email}
                                handleOnchange={handleOnchangeEmail}
                                disabled
                            />
                        </div>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor='phone'>Số điện thoại</WrapperLabel>
                        <div style={{ flex: 1 }}>
                            <InputForm
                                style={{ width: '100%' }}
                                id='phone'
                                value={phone}
                                handleOnchange={handleOnchangePhone}
                            />
                        </div>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor='address'>Địa chỉ</WrapperLabel>
                        <div style={{ flex: 1 }}>
                            <InputForm
                                style={{ width: '100%' }}
                                id='address'
                                value={address}
                                handleOnchange={handleOnchangeAddress}
                            />
                        </div>
                    </WrapperInput>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                backgroundColor: 'rgb(26, 148, 255)',
                                height: '40px',
                                width: '160px',
                                borderRadius: '20px',
                            }}
                            textButton={'Cập nhật thông tin'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '500' }}
                        ></ButtonComponent>
                    </div>
                </WrapperContentProfile>
            </Loading>
        </div>
    )
}

export default ProfilePage