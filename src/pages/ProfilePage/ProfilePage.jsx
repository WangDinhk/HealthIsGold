import React from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperLabel, WrapperInput } from './style'
import InputForm from "../../components/InputForm/InputForm";
import { useState } from 'react';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const ProfilePage = () => {
    const [email, setEmail] = useState('')
    const handleOnchangeEmail = () => {

    }
    const handleUpdate = () => {

    }

    return (
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <WrapperContentProfile>
                {/* Email người dùng */}
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
            </WrapperContentProfile>
        </div>
    )
}

export default ProfilePage