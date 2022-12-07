import axios from 'axios'
import Swal from 'sweetalert2';
import Http from './http'
import { logout } from './auth'


class RestApi extends Http {
    constructor(path) {
        super();
        this.fullPath = `${process.env.REACT_APP_API_PREFIX}${path}`;
    }

    async get(textIfError, params=null) {
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
                switch(error.request.status) {
                    case 403:
                        logout();
                        Swal.fire({
                            icon: 'error',
                            title: 'ログイン失敗',
                            text: error.msg,
                        });
                        break;
                    default:
                        Swal.fire({
                            icon: 'error',
                            title: 'サーバーエラー',
                            text: textIfError,
                        });
                }
                reject(error);
            });
        });
    };
}


export default RestApi;
