import { Dispatch } from 'redux';
import {
  setResetUserState,
  setUser,
  setToken,
  setIsLoading,
  setModalOpen,
  setError,
  setUserId,
} from '../reducers/auth.reducers';
import axios from 'axios';

export const signUp = (values: any) => async (dispatch: Dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .post(`${process.env.REACT_APP_BASE_URL}signup`, values)
    .then((res) => {
      dispatch(setIsLoading(false));
      dispatch(setModalOpen(false));
      console.log("This is values: ", res)
    })
    .catch((err) => {
      console.log('err =>', err);
    });
};

export const login = (payload: any) => async (dispatch: Dispatch) => {
  dispatch(setIsLoading(true));
  const { values, navigate } = payload;

  axios
    .post(`${process.env.REACT_APP_BASE_URL}login`, values)
    .then((res) => {
      const { profile, token, _id } = res.data;

      dispatch(setUser(profile));
      dispatch(setUserId(_id));
      dispatch(setToken(token));
      localStorage.setItem('token', token);
      navigate('/dashboard');
      res.data;
      dispatch(setIsLoading(false));
    })
    .catch((err) => {
      dispatch(setError(err.response.data.message));
      dispatch(setIsLoading(false));
      setTimeout(() => {
        dispatch(setError(null));
      }, 4000);
      console.log('err: =>', err.response.data.message);
    });
};
