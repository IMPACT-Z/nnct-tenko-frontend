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
        .then(() => 
            io.connect(this._webSocketPrefix, {
                path: this._path,
                extraHeaders: this.headers,
            }
        ));
    }

    async send (eventId, data) {
        return this.initByAsync()
        .then(socketIo => {
            socketIo.emit(eventId, data);
        });
    }
    
    async receive (eventId, callback) {
        return this.initByAsync()
        .then(socketIo => {
            socketIo.on(eventId, callback);
        });
    }
}

export default WebSocket;
