import axios from "axios";
import types from "../constants/userConstants";
import { url } from "../api/server";


export const login = (user) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${url}/adminlogin`,
      user,
      config
    );
    console.log(data)
    const { id, token } = data;
    localStorage.setItem('token', token)

    dispatch({
      type: types.USER_LOGIN_SUCCESS,
      payload: { id, token },
    });
  } catch (error) {
    dispatch({
      type: types.USER_LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: types.USER_LOGOUT,
  });
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
