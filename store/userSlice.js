import { createSlice } from '@reduxjs/toolkit'
// import { errorA, logd } from '../utils/log'

const initialState = {
  user: null,
  userProjectIDs: [],
  userLoggingIn: false,
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, {payload}) => {
      state.user = null
    },
    
   
    setUser: (state, {payload}) => {
      if (!payload) {
        return
      }

      state.user = payload
    },

    setUserLoggingIn: (state, {payload}) => {
      state.userLoggingIn = payload
    },
  },

})


// Action creators are generated for each case reducer function
export const { 
  setUser,
  setUserLoggingIn,
  logoutUser,
  } = userSlice.actions

export default userSlice.reducer