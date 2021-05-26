import types from '../constants/userConstants'; // importing constants naming as types
import * as API from '../api/server'; // * is to exoprt all which were exported from the file.
import {toast} from 'react-toastify';


const getUserAction =(data)=>({
    type: types.USER_GET_SUCCESS,
    payload: data
})

const delUserAction =()=>({
    type: types.USER_DEL_SUCCES,
    
})

const getUserActionFail =(error)=>({
    type: types.USER_GET_FAIL,
    payload: error
})

const delUserActionFail =(error)=>({
    type: types.USER_DEL_FAIL,
    payload: error
})

const getRoomAction =(data)=>({
    type: types.ROOM_GET_SUCCESS,
    payload: data
})

const getRoomActionFail =(error)=>({
    type: types.ROOM_GET_FAIL,
    payload: error
})

const approveRoomAction =()=>({
    type: types.APPROVE_ROOM_SUCCESS,
})

const approveRoomFilAction =(error)=>({
    type: types.APPROVE_ROOM_FAIL,
    payload: error
})

const getRequestActionFail =(error)=>({
    type: types.REQUEST_GET_FAIL,
    payload: error
})

const getRequestAction =(data)=>({
    type: types.REQUEST_GET_SUCCESS,
    payload: data
})

const approveRequestActionFail =(error)=>({
    type: types.APPROVE_REQUEST_FAIL,
    payload: error
})

const approveRequestAction =(data)=>({
    type: types.APPROVE_REQUEST_SUCCESS,
    payload: data
})



export const getUser= () => async(dispatch) =>{
  
    try{
        const {data} =await API.getUsers()  
        const users = data.users
        console.log(users);
        dispatch(getUserAction(users))

    }
    catch(error){
        dispatch(getUserActionFail(error))
        toast.error("Couldnot get data from db")
    }
  
}

export const delUser= (id) => async(dispatch) =>{
    try{
       
        const {data} =await API.delUser(id) //passing id into deluser api to pass to backend  
        dispatch(delUserAction())
        toast.success("Successfully Deleted From the System");
    }
    catch(error){
        dispatch(delUserActionFail(error))

    }
  
}

export const getRooms= () => async(dispatch) =>{
  
    try{
        const {data} =await API.getRooms();  

        console.log(data.data);
        dispatch(getRoomAction(data.data));

    }
    catch(error){
        dispatch(getRoomActionFail(error))
        toast.error("Couldnot get data from db")
    }
  
}
export const approveRoom= (id) => async(dispatch) =>{
  
    try{
        const {data} =await API.approveRoom(id);  
        // const users = data.users
        console.log(data);
        dispatch(approveRoomAction(data));
        toast.success("Successfully Approved");
    }
    catch(error){
        dispatch(approveRoomFilAction(error))
        // toast.error("Couldnot get data from db")
    }
  
}

export const getRequest= ()=> async(dispatch) =>{
    try{
        const {data} = await API.getRequest();
        console.log(data);
        dispatch(getRequestAction(data))
        
    }
    catch(error){
        dispatch(getRequestActionFail(error))
    }

}

export const approveRequest=(reqData) => async(dispatch)=>{
    try{
        const {data} = await API.approveRequest(reqData); 
        dispatch(approveRequestAction(data))
        console.log(reqData);
        toast.success(data.message);
    }
    catch(error){
        dispatch(approveRequestActionFail(error))
        toast.error("Couldnot approve the request due to some internal error")

    }
}