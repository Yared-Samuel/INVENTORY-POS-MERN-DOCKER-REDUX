import { createSlice } from '@reduxjs/toolkit'
const name = JSON.parse(localStorage.getItem("name"))
const role = JSON.parse(localStorage.getItem("role"))

const initialState = {
    isLoggedIn: false,
    name: name ? name : "",
    role: role ? role : "",
    user: {
      name: "",
      email: "",
      role: ""
    },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload
      console.log(action.payload)
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload))
      state.name = action.payload
    },
    SET_ROLE(state, action) {
      console.log(action.payload)
      localStorage.setItem("role", JSON.stringify(action.payload))
      state.role = action.payload
    },
    SET_USER(state, action) {
      const profile = action.payload
      state.user.name = profile.name
      state.user.email = profile.email
      state.user.role = profile.role
     
      
    }
  }
});

export const {SET_LOGIN, SET_NAME, SET_ROLE,SET_USER} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectName = (state) => state.auth.name
export const selectRole = (state) => state.auth.role
export const selectUser = (state) => state.auth.user

export default authSlice.reducer