import axios from 'axios'
import NProgress from 'nprogress'
import { store } from '../redux/store';
import { refreshToken } from '../services/apiServices';

NProgress.configure({
    showSpinner: false,
    // easing: 'ease',
    // speed: 500,
    // trickleRate: 0.5,
    // easing: 'ease',
    // speed: 200,
    // trickle: true,
    // trickleRate: 0.02,
    trickleSpeed: 100,
});

const instance = axios.create({
    baseURL: 'http://localhost:8081/',
})


instance.interceptors.request.use(function (config) {
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = "Bearer " + access_token;
    NProgress.start();
    return config;
}, function (error) {
    NProgress.start();
    return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
    NProgress.done();
    return response && response.data ? response.data : response;
}, function (error) {
NProgress.done();
    //token expired: EC === -999
    if(error.response.data && error.response.data.EC === -999) {
      
    }

    return error && error.response && error.response.data
        ? error.response.data : Promise.reject(error);
});

export default instance;

//interceptors : can thiep vao response va request