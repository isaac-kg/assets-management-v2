import { Dispatch } from "redux";
import {
    setResetUserState,
    setUser,
    setToken,
    setIsLoading,
    setModalOpen,
    setError,
    setUserId
} from "../reducers/auth.reducers";
import axios from "axios";


export const signUp = (values: any) => async (dispatch: Dispatch) => {

    dispatch(setIsLoading(true));
    values.roles = "tester";

  axios.post(`http://localhost:4000/signup`, values).then(res => {
    console.log("res =>", res.data)
    
    dispatch(setIsLoading(false));
    dispatch(setModalOpen(false));
  }).catch(err => {
    console.log("err =>", err)
  })
  }

  export const login = (payload: any) => async (dispatch: Dispatch) => {
    
    dispatch(setIsLoading(true));
    const{ values, navigate } = payload;
    console.log('Value: ', values);
    //TODO submit values to backend.

    axios.post(`http://localhost:4000/login`, values).then(res => {
      console.log("res =>", res.data)
      const {profile, token, _id} = res.data;

      dispatch(setUser(profile));
      dispatch(setUserId(_id));
      dispatch(setToken(token));

      navigate("/dashboard")
      res.data;
      dispatch(setIsLoading(false));
    }).catch(err => {
      dispatch(setError(err.response.data.message))
      dispatch(setIsLoading(false));
      console.log("err: =>", err.response.data.message)
    })

  }