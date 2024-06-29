import { Dispatch } from 'redux';
import {
  setResetAdminState,
  setUser,
  setAllUsers,
  setIsLoading,
  setError,
} from '../reducers/admin.reducers';
import axios from 'axios';

export const fetchAllUsers = () => async (dispatch: Dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .get(`${process.env.REACT_APP_BASE_URL}fetch-users`)
    .then((res) => {
      dispatch(setAllUsers(res.data.users));
    })
    .catch((err) => {
      dispatch(setError(err.data.message));
    })
    .finally(() => {
      dispatch(setIsLoading(false));
      setTimeout(() => {
        dispatch(setError(''));
      }, 3000);
    });
};
