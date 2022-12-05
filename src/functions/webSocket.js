import {io} from "socket.io-client";

import Http from './http'


class WebSocket extends Http {
    constructor(path) {
        super();
        this._webSocketPrefix = process.env.REACT_APP_API_PREFIX.replaceAll((/^https?/, 'ws'));
        this._path = path;
    }

    async initByAsync() {
        return await new Promise((resolve, reject) => {
            super.setAuthHeader()
            .then(() => {
                this._ioSocket = io(this._webSocketPrefix, {
                    path: this._path,
                    extraHeaders: this.headers,
                });
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    async send (eventId, data) {
        return this.initByAsync()
        .then(() => {
            this.ioSocket.emit(eventId, data);
        });
    }
    
    async receive (eventId, callback) {
        return this.initByAsync()
        .then(() => {
            this._ioSocket.on(eventId, callback);
        });
    }
}

export default WebSocket;
