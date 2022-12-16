import axios from 'axios'
import Swal from 'sweetalert2';
import { getIdTokenExcludingAuth, logout } from './auth'


class RestApi {
    static async init(path) {
        const headers = {};
        try {
            headers['Authorization'] = `Bearer ${await getIdTokenExcludingAuth()}`;
        }
        catch(error) {
            await logout();
            Swal.fire({
                icon: 'error',
                title: 'ログイン失敗',
                text_: error.msg,
            });
            throw error;
        }

        return {
            headers: headers,
            fullPath: `${process.env.REACT_APP_API_PREFIX}${path}`,
        };
    }

    static async get(path, errorMessage, params={}) {
        const {headers, fullPath} = await RestApi.init(path);
        const uri = (params === {}) ?fullPath : `${fullPath}?${new URLSearchParams(params).toString()}`;
        
        try {
            return await axios.get(uri, headers);
        }
        catch(error) {
            switch(error.request.status) {
                case 403:
                    await logout();
                    Swal.fire({
                        icon: 'error',
                        title: 'ログイン失敗',
                        text_: error.msg,
                    });
                    break;
                
                default:
                    Swal.fire({
                        icon: 'error',
                        title: 'サーバーエラー',
                        text_: errorMessage,
                    });
                    break;
            }
            throw error;
        }
    };
}


export default RestApi;
