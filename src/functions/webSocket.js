import {io} from "socket.io-client";
import Http from './http'

class WebSocket extends Http {
    constructor(path) {
        super();
        this._socket = io(process.process.REACT_WS_API_PREFIX, {
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
