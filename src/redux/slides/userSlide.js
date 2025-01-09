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
      console.log("Updating user in Redux:", {
        currentState: state,
        newData: action.payload
      });
      const { name = '', email = '', phone = '', address = '', avatar = '', accessToken = '', _id = '', isAdmin = false } = action.payload;
      
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.accessToken = accessToken;
      state.id = _id;
      state.isAdmin = isAdmin === true;
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
