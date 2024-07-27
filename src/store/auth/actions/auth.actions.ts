import { Dispatch } from 'redux';
import {
  setResetUserState,
  setUser,
  setToken,
  setIsLoading,
  setModalOpen,
  setError,
  setUserId,
  setSuccess,
} from '../reducers/auth.reducers';
import axios from 'axios';

export const signUp =
  ({ values }: Record<string, any>) =>
  async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));
    values['idNumber'] = '98234234242';

    axios
      .post(`${process.env.REACT_APP_BASE_URL}signup`, values)
      .then((res) => {
        dispatch(setModalOpen(false));
        dispatch(setSuccess('User has been added.'));
      })
      .catch((err) => {
         dispatch(setError(err?.response?.data?.message))
      })
      .finally(() => {
        dispatch(setIsLoading(false));
        setTimeout(() => {
          dispatch(setError(""));
          dispatch(setSuccess(""))
        }, 4000);
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
      dispatch(setIsLoading(false));
      navigate('/dashboard');
    })
    .catch((err) => {
      dispatch(setError(err?.response?.data?.message));
      dispatch(setIsLoading(false));
      setTimeout(() => {
        dispatch(setError(""));
      }, 4000);
    });
}; 

export const updateUser = (payload: any) =>  async (dispatch: Dispatch) =>{
  dispatch(setIsLoading(true));
  const { values } = payload;

  
  axios
    .post(`${process.env.REACT_APP_BASE_URL}login`, values)
    .then((res) => {
      console.log("Response: ", res);
      dispatch(setIsLoading(false));
    })
    .catch((err) => {
      console.log("Error: ", err);
      dispatch(setError(err?.response?.data?.message));
      dispatch(setIsLoading(false));
      setTimeout(() => {
        dispatch(setError(""));
      }, 4000);
    });

}

export const logOut = () => (dispatch: Dispatch) => {
  dispatch(setResetUserState())
}
