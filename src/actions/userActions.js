import axios from "axios";
import types from "../constants/userConstants";
import { url } from "../api/server";
import * as API from '../api/server'; 
import { toast } from "react-toastify";


const userLoginAction=(data)=>({
  type: types.USER_LOGIN_SUCCESS,
  payload: data
})

const userLoginFailAction=(error)=>({
  type: types.USER_LOGIN_FAIL,
  payload: error
})

const userlogoutAction=(data)=>({
  type: types.USER_LOGOUT,
  payload: data
})

const loadingAction=()=>({
  type: types.USER_LOGIN_REQUEST,
  
})

export const login = (user) => async (dispatch) => {
  try {
    dispatch(loadingAction())
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const {id,token} = await API.login(user);
    toast.success("Logged in Successfully");
    localStorage.setItem('token', token)
    dispatch(userLoginAction({id,token}))
   
  } catch (error) {
    dispatch(userLoginFailAction(error));
    toast.error("Invalid credentails");
  }
};

export const logout = () => (dispatch) => {
  toast.info("Logged out successfully");
 dispatch(userlogoutAction());
 
};

export const register = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_REGISTER_REQUEST,

    });

    //       type: USER_REGISTER_SUCCESS,
    //       payload: data
    //     })

    dispatch({
      type: types.USER_REGISTER_SUCCESS,
      payload: data
    });

    dispatch({
      type: types.USER_LOGIN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: types.USER_REGISTER_FAIL,
    });
  }
};
