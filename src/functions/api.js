import axios from 'axios'
import {getIdToken} from './auth'


class Api {
    async setAuthHeader() {
        getIdToken()
        .then(idToken => {
            this.headers['Authorization'] = `Bearer ${idToken}`;
        });
    }

    async asyncProcessInConstructor() {
        setAuthHeader();
    }

    constructor(path) {
        this.fullPath = `${process.env.REACT_APP_API_PREFIX}/${path}`;
        this.headers = {}
        asyncProcessInConstructor();
    }

    async get(params={}) {
        const uri = `${this.getFullPath(path)}?${new URLSearchParams(params).toString()}`;
    
        return await new Promise((resolve, reject) => {
            axios.get(uri, this.headers)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
            });
        });
    };
    
    async post(data) {
        const uri = this.fullPath;
    
        return await new Promise((resolve, reject) => {
            axios.post(uri, data)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
            });
        });
    };
}


export default Api;
