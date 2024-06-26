import { Dispatch } from "redux";
import {
    setResetAdminState,
    setUser,
    setAllUsers,
    setIsLoading
} from "../reducers/admin.reducers";
import axios from "axios";

export const fetchAllUsers = () => async (dispatch: Dispatch) => {

    axios.get(`${process.env.REACT_APP_BASE_URL}fetch-users`).then(res => {
      console.log("Data: ",res.data.users)
      dispatch(setAllUsers(res.data.users));

    }).catch(err => {
      console.log("err =>", err)
    })
  }