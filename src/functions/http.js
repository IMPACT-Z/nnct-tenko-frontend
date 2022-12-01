import {getIdToken} from './auth'

class Http {
    async setAuthHeader() {
        getIdToken()
        .then(idToken => {
            this.headers['Authorization'] = `Bearer ${idToken}`;
        });
    }

    async asyncProcessInConstructor() {
        setAuthHeader();
    }

    constructor() {
        this.headers = {};
        asyncProcessInConstructor();
    }
}

export default Http;
