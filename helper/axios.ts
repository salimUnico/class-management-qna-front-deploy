import axios from 'axios';
// Setting up base Url for fetching data

const fetcher = axios.create({
    baseURL: process.env.ENV !== 'Production' ? 'https://tpi-clms.herokuapp.com/api/v1' : 'http://localhost:5000/api/v1', //dev
    headers: {
        'Content-Type': 'application/json',
        // 'Acess-Control-Allow-Origin':'*',
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
        Authorization: `Bearer ${typeof window !== 'undefined' && localStorage.getItem('token')}`,
        Accept: 'application/json',
    },
});

export default fetcher;
