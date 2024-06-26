import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  user: null;
  token: string;
  isLoading: boolean;
  modalOpen: boolean;
  error: string;
  userId: string;
  success: string;
}

const initialState: AuthState = {
  user: null,
  token: '',
  isLoading: false,
  modalOpen: false,
  error: '',
  userId: '',
  success: '',
};

export const authStateSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setResetUserState: (state) => (state = initialState),
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload
    }
  },
});

export const {
  setResetUserState,
  setUser,
  setToken,
  setIsLoading,
  setModalOpen,
  setError,
  setUserId,
  setSuccess
} = authStateSlice.actions;

export default authStateSlice;
