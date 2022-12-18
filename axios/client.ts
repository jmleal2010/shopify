import axios from 'axios';

const axiosClient =  axios.create({
    baseURL: 'https://sibucan-shop-staging.herokuapp.com/',
    timeout: 10000,
    headers: {
        'Accept': 'application/json'
    }
})


export default axiosClient