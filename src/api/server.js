import axios from "axios";
export const url = "http://localhost:5000";
// export const register = (user) => axios.post(`${url}/users`, user);
const token = localStorage.getItem('token');

const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
    }
}

export const getUsers = () =>  axios.get(url + `/api/getUsersInfo`, config) ;
export const delUser = (id) =>  axios.delete(url + `/api/delUser/${id}`, config) ;
export const login = (user) =>  axios.post(url + `/api/adminlogin`,user, config) ;
export const getRooms = () =>  axios.get(url + `/v1/getRoomDetail`, config);
export const approveRoom = (id) =>  axios.post(url + `/v1/approveRoom/${id}`, config);
