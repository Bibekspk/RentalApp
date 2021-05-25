import types from '../constants/userConstants'
export const userData = (state = {}, action) => {
    // console.log(action)
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
        case types.ROOM_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                rooms: action.payload
            }
        case types.REQUEST_GET_FAIL:
            return {
                ...state,
                loading: false,

            }
        case types.REQUEST_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                requests: action.payload
            }

        case types.APPROVE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                approveStatus: true
            }
        case types.APPROVE_ROOM_FAIL:
            return {
                ...state,
                loading: false,
                approveStatus: false
            }
        case types.ROOM_GET_FAIL:
            return {
                ...state,
                loading: true
            }


    }
    return state

}
export default userData;
