import {io} from "socket.io-client";
import Http from './http'

class WebSocket extends Http {
    constructor(path) {
        super();
        const webSocketPrefix = process.process.REACT_WS_API_PREFIX.replaceAll((/^https?/, 'ws'));
        this._socket = io(webSocketPrefix, {
            path: path,
            extraHeaders: this.headers,
        });
    }

    send (eventId, data) {
        this._socket.emit(eventId, data);
    }
    
    receive (eventId, callback) {
        this._socket.on(eventId, callback);
    }
}

export default WebSocket;
