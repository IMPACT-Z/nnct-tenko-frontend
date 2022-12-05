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
                const statusCode = error.response.data.status;
                if (statusCode === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'バリデーション失敗',
                        text: error.response.data.msg,
                    });
                }
                else if (statusCode === 403) {
                    logout();
                    Swal.fire({
                        icon: 'error',
                        title: 'ログイン失敗',
                        text: error.response.data.msg,
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'ログイン失敗',
                        text: textIfError,
                    });
                }
                reject(error.response);
            });
        });
    };
}


export default RestApi;
