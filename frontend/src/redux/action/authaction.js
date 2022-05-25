
import axios from 'axios'

const ACTIONS = {
    LOGIN: 'LOGIN',
    GET_TOKEN: 'GET_TOKEN',
    GET_USER: 'GET_USER',
    GET_ALL_USERS: 'GET_ALL_USERS'
}

export default ACTIONS
export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async (token) => {
    const res = await axios.get('/user/infor', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.role === 1 ? true : false
        }
    }
}