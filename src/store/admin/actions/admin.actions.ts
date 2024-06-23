import { Dispatch } from "redux";
import {
    setResetAdminState,
    setUser,
    setAllUsers,
    setIsLoading
} from "../reducers/admin.reducers";
import axios from "axios";

export const fetchAllUsers = () => async (dispatch: Dispatch) => {

    axios.get(`http://localhost:4000/fetch-users`).then(res => {
      dispatch(setAllUsers(res.data.users));

    }).catch(err => {
      console.log("err =>", err)
    })
  }