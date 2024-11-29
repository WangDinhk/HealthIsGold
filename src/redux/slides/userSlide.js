import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  accessToken: '',
  id: ''
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name = '', email = '', phone = '', address = '', avatar = '', accessToken = '', _id = '' } = action.payload;
      console.log('action', action);
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.accessToken = accessToken;
      state.id = _id;
    },

    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.id = '';
      state.accessToken = '';
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUser } = userSlide.actions

export const userReducer = userSlide.reducer;
