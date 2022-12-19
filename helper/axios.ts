import axios from 'axios';
// Setting up base Url for fetching data

const fetcher = axios.create({
    // baseURL: 'https://tpi-clms.herokuapp.com/api/v1', //dev
    baseURL: 'https://tpi-doc-creator-backend.onrender.com/', //live
    headers: {
        'Content-Type': 'application/json',
        // 'Acess-Control-Allow-Origin':'*',
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
        Authorization: `Bearer ${typeof window !== 'undefined' && localStorage.getItem('token')}`,
        Accept: 'application/json',
    },
});

export default fetcher;
