import types from '../constants/userConstants';
import * as API from '../api/server';
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
        // toast.error("Couldnot delete data the user")
    }
  
}