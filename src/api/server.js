import axios from "axios";
export const url = "http://localhost:5000/api";
// export const register = (user) => axios.post(`${url}/users`, user);
const token = localStorage.getItem('token');

const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
    }
}

export const getUsers = () =>  axios.get(url + `/getUsersInfo`, config) ;
export const delUser = (id) =>  axios.delete(url + `/delUser/${id}`, config) ;
