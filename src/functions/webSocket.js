import {io} from "socket.io-client";
import Http from './http'

class WebSocket extends Http {
    constructor(path) {
        super();
        const webSocketPrefix = process.env.REACT_APP_API_PREFIX.replaceAll((/^https?/, 'ws'));
        this._socket = io(webSocketPrefix, {
            path: path,
            // withCredentials: true,
            extraHeaders: this.headers,
        });
    }

    send (eventId, data) {
        this._socket.emit(eventId, data);
    }

    // sendImage(eventId, ) {
    //     let imageFilePath = this.path.join(__dirname, 'public/img/sample1.jpg');

    //     fs.readFile(imageFilePath, 'base64', (err, data) => {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         const imgSrc = 'data:image/jpg;base64,' + data;
    //         socket.emit(eventId, { imgSrc });
    //     });
    // }
    
    receive (eventId, callback) {
        this._socket.on(eventId, callback);
    }
}

export default WebSocket;
