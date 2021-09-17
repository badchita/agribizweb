import axios from 'axios';

let instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    resourceURL: 'http://localhost:8000/',
    header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
    // You can add your headers here
});

export default instance;