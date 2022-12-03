import {io} from "socket.io-client";
import Http from './http'

class WebSocket extends Http {
    constructor(path) {
        super();
        this._webSocketPrefix = process.env.REACT_APP_API_PREFIX.replaceAll((/^https?/, 'ws'));
        this._path = path;
    }

    async initByAsync() {
        return super.setAuthHeader()
        .then(() => {
            this._socket = io(this._webSocketPrefix, {
                path: this._path,
                // withCredentials: true,
                extraHeaders: this.headers,
            });
        })
    }

    async send (eventId, data) {
        return this.initByAsync()
        .then(() => {
            this._socket.emit(eventId, data);
        });
    }
    
    async receive (eventId, callback) {
        await this.setAuthHeader();
        this._socket.on(eventId, callback);
    }
}

export default WebSocket;
