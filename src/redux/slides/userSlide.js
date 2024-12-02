import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  accessToken: '',
  id: '',
  isAdmin: false,
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name = '', email = '', phone = '', address = '', avatar = '', accessToken = '', _id = '',isAdmin=false } = action.payload;
      console.log('action', action);
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.accessToken = accessToken;
      state.id = _id;
      state.isAdmin = true;
    },

    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.id = '';
      state.accessToken = '';
      state.isAdmin = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export const userReducer = userSlide.reducer;
