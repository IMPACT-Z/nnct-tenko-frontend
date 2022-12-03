import axios from 'axios'
import Http from './http'


class RestApi extends Http {
    constructor(path) {
        super();
        this.fullPath = `${process.env.REACT_APP_API_PREFIX}${path}`;
    }

    async get(params=null) {
        await super.setAuthHeader();

        const uri = (params === null) ?
            this.fullPath :
            `${this.fullPath}?${new URLSearchParams(params).toString()}`;

    
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
        await super.setAuthHeader();
        
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


export default RestApi;
