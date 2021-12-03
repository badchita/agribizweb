import axios from 'axios';
import helpers from '../globals/helpers'
import AuthAPI from './auth'

let api = axios.create({
    // baseURL: 'http://localhost:8000/api/',
    // baseURL: 'http://10.0.2.2:3000/api/',
    baseURL: 'http://192.168.56.1:8000/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: null
    }
    // You can add your headers here
});

// Add a response interceptor
const createInterceptor = () => {
    const interceptor = api.interceptors.response.use((response) => {
        return response
    }, (err) => {
        const errors = helpers.parseError(err)
        if (errors[0] && errors[0].status === '401' && errors[0].code === 'INVALID_TOKEN') {
            api.interceptors.response.eject(interceptor)
            const token = localStorage.getItem('token')
            console.log(token);
            return AuthAPI.setToken(token)
        }
        return Promise.reject(err)
    })
}
createInterceptor()

export default api;