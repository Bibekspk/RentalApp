import types from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  console.log(action)
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        authenticate: true,
        loginuserInfo: action.payload,
      };

    case types.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case types.USER_LOGOUT:
      return {
        authenticate: false
      };

    default:
      return state;
  }
};

