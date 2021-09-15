import axios from 'axios';

let instance = axios.create({
    baseURL: 'http://agribiz/api/',
    resourceURL: 'http://agribiz/',
    header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
    // You can add your headers here
});

export default instance;