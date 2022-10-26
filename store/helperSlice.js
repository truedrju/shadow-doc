import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toastMsg: {text: ""},
  isMobileNavOpen: false,
  isLoginModalOpen: false,
  projectIdentifier: null,
  selectedPostGroupType: {name: "All", label: "All", value: "/images/plum.png"},
  statType: 'Market Cap',
}


export const helperSlice = createSlice({
name: 'helper',
  initialState,
  reducers: {
    // Login Modal
    setIsLoginModalOpen: (state, {payload}) => {
      state.isLoginModalOpen = payload
    },

    // Left Nav
    setIsMobileNavOpen: (state, {payload}) => {
      state.isMobileNavOpen = payload
    },
    
    setPostGroupType: (state, {payload}) => {
      state.selectedPostGroupType = payload
    },

    // Notification Pop Up
    setToast: (state, {payload}) => {
      console
      // expects something like
      // {type (optional): one of ["success", "error"], text: "some cool message"}
      state.toastMsg = payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  setIsMobileNavOpen,
  setIsLoginModalOpen,
  setPostGroupType,
  setToast 
} = helperSlice.actions

export default helperSlice.reducer

