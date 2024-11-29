import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  accessToken: ''
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name = '', email = '', phone = '', address = '', avatar = '', accessToken = '' } = action.payload;
      console.log('action', action);
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.accessToken = accessToken;
    },

    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.accessToken = '';
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUser } = userSlide.actions

export const userReducer = userSlide.reducer;
