import axios from 'axios';

let api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    resourceURL: 'http://localhost:8000/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: null
    }
    // You can add your headers here
});

export default api;