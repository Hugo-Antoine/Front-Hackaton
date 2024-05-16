import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://climbing-mastodon-shortly.ngrok-free.app//api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "ngrok-skip-browser-warning": "true",
        'Access-Control-Allow-Origin': '*',
    }
});

export default axiosInstance;