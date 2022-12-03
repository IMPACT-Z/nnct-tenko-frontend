import {getIdToken} from './auth'

class Http {
    async setAuthHeader() {
        return await getIdToken()
        .then(idToken => {
            this.headers['Authorization'] = `Bearer ${idToken}`;
        });
    }

    constructor() {
        this.headers = {};
    }
}

export default Http;
