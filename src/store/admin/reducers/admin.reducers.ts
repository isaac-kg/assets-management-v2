import { createSlice } from '@reduxjs/toolkit'

export interface AdminState {
  user: null;
  allUsers: [];
  isLoading: boolean;
}

const initialState: AdminState = {
    user: null,
    allUsers: [],
    isLoading: false,
}

export const AdminStateSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setResetAdminState: (state) => state = initialState,
    setUser: (state, actions) => {
        state.user = actions.payload
    },
    setAllUsers: (state, actions) => {
        state.allUsers = actions.payload
    },
    setIsLoading: (state, actions) => {
        state.isLoading = actions.payload
    },
    
  }
})

// Action creators are generated for each case reducer function
export const {
    setResetAdminState,
    setUser,
    setAllUsers,
    setIsLoading
} = AdminStateSlice.actions

export default AdminStateSlice
