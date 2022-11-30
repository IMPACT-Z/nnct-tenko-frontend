import axios from 'axios'


class Api {
    static get = async (path, auth=null, params={}) => {
        const uri = `${path}?${new URLSearchParams(params).toString()}`;
    
        const headers = {}
        if (auth !== null) headers['Authorization'] = `Bearer ${auth}`;
    
        return await new Promise((resolve, reject) => {
            axios.get(uri, headers)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
            });
        });
    };
    
    static post = async (path, data, auth=null) => {
        const uri = path
    
        const headers = {}
        if (auth !== null) headers.Authorization = auth;
    
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
