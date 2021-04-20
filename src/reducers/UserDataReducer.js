import types from '../constants/userConstants'
export const userData = (state = {}, action) => {
    console.log(action)
    switch (action.type) {
        case types.USER_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case types.USER_GET_FAIL:
            return {
                loading: true
            }

      
    }
    return state

}
export default userData;
