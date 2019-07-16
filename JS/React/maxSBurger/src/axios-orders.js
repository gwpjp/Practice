import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://maxs-burgerbuild.firebaseio.com/'
});

export default instance;
